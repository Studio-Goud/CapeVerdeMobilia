-- =============================================================================
-- Kavíla — custom SQL applied after `prisma migrate dev`.
-- Adds a PostGIS point column for spatial queries and a full-text search vector
-- trigger for listings. Prisma manages the tables; this handles what its schema
-- language cannot express directly. Apply with:
--   psql "$DATABASE_URL" -f packages/database/prisma/sql/search_and_geo.sql
-- =============================================================================

-- 1) Spatial point on Location (WGS84). Kept in sync from latitude/longitude.
ALTER TABLE "Location" ADD COLUMN IF NOT EXISTS geom geometry(Point, 4326);

UPDATE "Location"
SET geom = ST_SetSRID(ST_MakePoint(longitude::double precision, latitude::double precision), 4326)
WHERE longitude IS NOT NULL AND latitude IS NOT NULL AND geom IS NULL;

CREATE INDEX IF NOT EXISTS location_geom_gix ON "Location" USING GIST (geom);

CREATE OR REPLACE FUNCTION location_sync_geom() RETURNS trigger AS $$
BEGIN
  IF NEW.latitude IS NOT NULL AND NEW.longitude IS NOT NULL THEN
    NEW.geom := ST_SetSRID(ST_MakePoint(NEW.longitude::double precision, NEW.latitude::double precision), 4326);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS location_geom_trg ON "Location";
CREATE TRIGGER location_geom_trg
  BEFORE INSERT OR UPDATE OF latitude, longitude ON "Location"
  FOR EACH ROW EXECUTE FUNCTION location_sync_geom();

-- 2) Full-text search vector for listings (title + description),
--    accent-insensitive via unaccent. Portuguese config.
CREATE OR REPLACE FUNCTION listing_search_vector() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" :=
    setweight(to_tsvector('portuguese', unaccent(coalesce(NEW.title, ''))), 'A') ||
    setweight(to_tsvector('portuguese', unaccent(coalesce(NEW.description, ''))), 'B');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS listing_search_trg ON "Listing";
CREATE TRIGGER listing_search_trg
  BEFORE INSERT OR UPDATE OF title, description ON "Listing"
  FOR EACH ROW EXECUTE FUNCTION listing_search_vector();

CREATE INDEX IF NOT EXISTS listing_search_gin ON "Listing" USING GIN ("searchVector");

-- Backfill existing rows.
UPDATE "Listing" SET title = title;
