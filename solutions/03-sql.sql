/* Basic function which is a trigger to automatically updated */
CREATE OR REPLACE FUNCTION updated_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated = now();
    RETURN NEW;
END;
$$ language plpgsql;

/* Enable the uuid-ossp extension to generate uuid/v4 for ID column
   Note: this requires root privs to enable this
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/** profile_data CREATE TABLE SQL. 
    Note: decision was made to use uuid/v4 for IDs. This may be incorrect but wasn't in the spec.
    Also "sensible" limits on first_name, last_name and gender was used.
    I didn't want to limit the gender field to male/female/other with an enum at this stage.
*/
CREATE TABLE profile_data(
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   profile_pic TEXT NOT NULL,
   locale VARCHAR(11) NOT NULL,
   timezone SMALLINT NOT NULL,
   gender VARCHAR(15) NOT NULL,
   last_ad_referral jsonb NOT NULL default '{}'::jsonb,
   created TIMESTAMP DEFAULT current_timestamp,
   updated TIMESTAMP NULL
);

/* Trigger to set updated value and use the above function */
CREATE TRIGGER set_updated 
BEFORE UPDATE ON profile_data 
FOR EACH ROW 
EXECUTE PROCEDURE updated_timestamp();

/* Example INSERT query for profile_data */
INSERT INTO profile_data (first_name, last_name, profile_pic, locale, timezone, gender, last_ad_referral) 
VALUES ('Luke', 'Steadman', '/path/to/profile-picture', 'en_GB', 0, 'Male', '{"source": "ADS", "type": "OPEN_THREAD", "ad_id": "6045246247433"}');