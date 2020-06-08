/* Example SQL command */
SELECT COUNT(*) as count FROM app_events 
WHERE event_data ->> 'StateName' IN ('reorder', 'reorder-allergy-info', 'reorder-pay') 
AND bot_id = '6' AND EXTRACT(MONTH FROM created_at) = 6;

/* Prepated statement using the above SQL */
PREPARE find_events (text, int) AS
    SELECT COUNT(*) as count FROM app_events 
    WHERE event_data ->> 'StateName' IN ('reorder', 'reorder-allergy-info', 'reorder-pay') 
    AND bot_id = $1 AND EXTRACT(MONTH FROM created_at) = $2;

/* Example usage of find_events prepared statement */
EXECUTE find_events('6', 6);

/* INSERTS to created dummy data */ 
INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('6', 1, '123', 'foo', 'foo', '{ "StateName": "reorder-allergy-info" }');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('6', 2, '123', 'foo', 'foo', '{ "StateName": "reorder" }');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data)
VALUES ('6', 3, '123', 'foo', 'foo', '{ "StateName": "reorder-pay" }');