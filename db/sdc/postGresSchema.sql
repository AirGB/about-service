-- This file is for creating the database, schema, and tables of this service.
-- Steps to Run this file
  -- Open postGres on you computer
  -- Within this file's directory in terminal...
    -- Run 'psql < postGresSchema.sql' 
    -- The lines to populate the database are at the bottom 
      -- These can only be run after the relevant csv files are generated

DROP DATABASE IF EXISTS rental_hosts;
CREATE DATABASE rental_hosts;

\c rental_hosts;

CREATE TABLE hosts (
  id INTEGER NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  joined_in_date TEXT NOT NULL,
  references_count INTEGER,
  verified BOOLEAN,
  description TEXT NOT NULL,
  response_rate NUMERIC,
  response_time INTEGER,
  languages TEXT, 
  email TEXT NOT NULL,
  avatar_url TEXT NOT NULL
);

CREATE TABLE listings (
  id INTEGER NOT NULL PRIMARY KEY,
  features TEXT,
  things_to_do TEXT,
  lat_location NUMERIC,
  lon_location NUMERIC,
  host_guidebook TEXT
);

CREATE TABLE reviews (
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  list_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES hosts(id),
  FOREIGN KEY (list_id) REFERENCES listings(id)
);

-- Uncomment lines below and run psql < postGresSchama.sql in terminal 

\copy hosts FROM './csvTables/hostsTable.csv' DELIMITER ',' CSV;
\copy listings FROM './csvTables/listingsTable.csv' DELIMITER ',' CSV;
\copy reviews FROM './csvTables/reviewsTable.csv' DELIMITER ',' CSV; 
