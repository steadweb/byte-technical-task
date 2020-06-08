# Performance

I'd move the `StateName` from the `event_data` jsonb column, and create it's own column within the `app_events` table. `state_name` would could be an `enum` of known states and then an index on the `enum` would be created. The query would then be modified like so:

```sql
SELECT COUNT(*) as count FROM app_events
WHERE state_name IN ('reorder', 'reorder-allergy-info', 'reorder-pay')
AND bot_id = 'stead-bot' AND EXTRACT(MONTH FROM created_at) = 6;
```

_Note: the prepared statement also needs updating, the command for this is below._

SQL to create the type and new table with the ENUM

```sql
CREATE TYPE states AS ENUM('reorder', 'reorder-allergy-info', 'reorder-pay');
```

Then create the table using the `states` type

```sql
CREATE TABLE app_events (
  bot_id text not null,
  event_id bigserial not null PRIMARY KEY,
  aggregate_type text not null,
  aggregate_id text not null,
  event_type text not null,
  event_data jsonb not null,
  state_name states,
  created_at timestamp default now() not null
);
```

Then create the index on the new `state_name` column:

```sql
CREATE INDEX state_name ON app_events(state_name);
```

Finally, `DEALLOCATE` the prepared statement (if required) and create the new version of the above `SELECT`.

```sql
DEALLOCATE find_events; /* Only reqruied if already allocated */

PREPARE find_events (text, int) AS
  SELECT COUNT(*) as count FROM app_events
  WHERE state_name IN ('reorder', 'reorder-allergy-info', 'reorder-pay')
  AND bot_id = $1 AND EXTRACT(MONTH FROM created_at) = $2;

```

#### Optional

Create some dummy data to test the above SELECT query out

```sql
INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data, state_name)
VALUES ('stead-bot', 1, '123', 'foo', 'foo', '{}', 'reorder-allergy-info');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data, state_name)
VALUES ('stead-bot', 2, '123', 'foo', 'foo', '{}', 'reorder');

INSERT INTO app_events (bot_id, event_id, aggregate_type, aggregate_id, event_type, event_data, state_name)
VALUES ('stead-bot', 3, '123', 'foo', 'foo', '{}', 'reorder-pay');
```
