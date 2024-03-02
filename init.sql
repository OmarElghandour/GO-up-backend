-- Create admin user
CREATE ROLE admin WITH LOGIN SUPERUSER PASSWORD 'adminpassword';

-- Grant necessary privileges to the admin user
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO admin;
