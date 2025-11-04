-- init.sql: cria schema para datalivery
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE restaurants (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 name text NOT NULL,
 city text,
 created_at timestamptz DEFAULT now()
);
CREATE TABLE customers (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 name text NOT NULL,
 email text,
 phone text,
 city text,
 lat numeric,
 lon numeric,
 created_at timestamptz DEFAULT now()
);
CREATE TABLE menu_items (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
 name text NOT NULL,
 price numeric NOT NULL
);
CREATE TABLE orders (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 restaurant_id uuid NOT NULL REFERENCES restaurants(id),
 customer_id uuid NOT NULL REFERENCES customers(id),
 order_value numeric NOT NULL,
 delivery_time_minutes integer,
 rating integer, -- 1-5
 nps_score integer, -- -100..100 (we'll scale to typical NPS)
 created_at timestamptz DEFAULT now()
);
CREATE TABLE order_items (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 menu_item_id uuid NOT NULL,
 quantity integer NOT NULL,
 price numeric NOT NULL
);
-- índices para consultas de dashboard
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);