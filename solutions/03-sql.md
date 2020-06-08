# Profile Data

Examples of `INSERT` and `UPDATE` commands working with the `03-sql.sql` commands. The `INSERT` demonstrates `id` and `created` fields being automatically populated. `UPDATE` demonstrates the trigger kicking in and updating the `updated` field.

## INSERT

```bash
byte=> INSERT INTO profile_data (first_name, last_name, profile_pic, locale, timezone, gender, last_ad_referral) VALUES ('Luke', 'Steadman', '/path/to/profile-picture', 'en_GB', 0, 'Male', '{"source": "ADS", "type": "OPEN_THREAD", "ad_id": "6045246247433"}');
INSERT 0 1
byte=> SELECT id, first_name, created, updated FROM profile_data;
                  id                  | first_name |          created           |          updated
--------------------------------------+------------+----------------------------+----------------------------
 e88b0fcd-972e-4b46-a360-6d49792db038 | Luke John  | 2020-06-08 11:29:31.468312 |
```

## UPDATE

```bash
byte=> UPDATE profile_data SET first_name = 'Luke John' WHERE id = 'e88b0fcd-972e-4b46-a360-6d49792db038';
UPDATE 1
byte=> SELECT id, first_name, created, updated FROM profile_data;
                  id                  | first_name |          created           |          updated
--------------------------------------+------------+----------------------------+----------------------------
 e88b0fcd-972e-4b46-a360-6d49792db038 | Luke John  | 2020-06-08 11:29:31.468312 | 2020-06-08 11:30:12.379356
(1 row)
```
