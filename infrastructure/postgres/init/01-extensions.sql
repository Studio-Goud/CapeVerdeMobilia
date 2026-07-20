-- Enable required PostgreSQL extensions for Ilhavista.
-- Runs automatically on first container start (docker-entrypoint-initdb.d).
CREATE EXTENSION IF NOT EXISTS postgis;         -- geospatial (parcels, coordinates, radius search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;         -- trigram fuzzy text matching
CREATE EXTENSION IF NOT EXISTS unaccent;        -- accent-insensitive search (PT / Creole)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- uuid generation fallback

-- Shadow database used by Prisma Migrate in development.
SELECT 'CREATE DATABASE ilhavista_shadow OWNER ilhavista'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ilhavista_shadow')\gexec
