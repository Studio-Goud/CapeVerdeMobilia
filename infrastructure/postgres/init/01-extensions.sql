-- Enable required PostgreSQL extensions for Djarvista.
-- Runs automatically on first container start (docker-entrypoint-initdb.d).
CREATE EXTENSION IF NOT EXISTS postgis;         -- geospatial (parcels, coordinates, radius search)
CREATE EXTENSION IF NOT EXISTS pg_trgm;         -- trigram fuzzy text matching
CREATE EXTENSION IF NOT EXISTS unaccent;        -- accent-insensitive search (PT / Creole)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";     -- uuid generation fallback

-- Shadow database used by Prisma Migrate in development.
SELECT 'CREATE DATABASE djarvista_shadow OWNER djarvista'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'djarvista_shadow')\gexec
