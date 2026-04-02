CREATE TABLE IF NOT EXISTS issues (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION notify_table_changes()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('table_changes', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER issues_notify
AFTER INSERT OR UPDATE ON issues
FOR EACH ROW
EXECUTE FUNCTION notify_table_changes();
