/* Example SQL command */
SELECT COUNT(*) as count FROM app_events 
WHERE event_data ->> 'StateName' IN ('reorder', 'reorder-allergy-info', 'reorder-pay') 
AND bot_id = 'stead-bot' AND EXTRACT(MONTH FROM created_at) = 6;

/* Prepated statement using the above SQL */
PREPARE find_events (text, int) AS
    SELECT COUNT(*) as count FROM app_events 
    WHERE event_data ->> 'StateName' IN ('reorder', 'reorder-allergy-info', 'reorder-pay') 
    AND bot_id = $1 AND EXTRACT(MONTH FROM created_at) = $2;

/* Example usage of find_events prepared statement */
EXECUTE find_events('stead-bot', 6);

/* INSERTS to created dummy data */ 
INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('stead-bot', 1, '123', 'foo', 'foo', '{ "StateName": "reorder-allergy-info" }');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('stead-bot', 2, '123', 'foo', 'foo', '{ "StateName": "reorder" }');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('stead-bot', 3, '123', 'foo', 'foo', '{ "StateName": "reorder-pay" }');

/* Note: I fixed the PRIMARY KEY bug as primary key app_events_pkey (event_id) isn't valid : */
create table app_events (
  bot_id text not null,
  event_id bigserial not null PRIMARY KEY,
  aggregate_type text not null,
  aggregate_id text not null,
  event_type text not null,
  event_data jsonb not null,
  created_at timestamp default now() not null
);