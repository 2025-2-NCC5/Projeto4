-- init.sql: cria schema para datalivery
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurantes
CREATE TABLE restaurants (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 name text NOT NULL,
 city text,
 created_at timestamptz DEFAULT now()
);

-- Clientes
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

-- Itens do cardápio
CREATE TABLE menu_items (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 restaurant_id uuid NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
 name text NOT NULL,
 price numeric NOT NULL
);

-- Pedidos
CREATE TABLE orders (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 restaurant_id uuid NOT NULL REFERENCES restaurants(id),
 customer_id uuid NOT NULL REFERENCES customers(id),
 order_value numeric NOT NULL,
 delivery_time_minutes integer,
 rating integer, -- 1-5
 nps_score integer, -- -100..100
 created_at timestamptz DEFAULT now()
);

-- Itens dos pedidos
CREATE TABLE order_items (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 menu_item_id uuid NOT NULL,
 quantity integer NOT NULL,
 price numeric NOT NULL
);

-- Campanhas simuladas (para admins)
CREATE TABLE campaigns (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 name text NOT NULL,
 type text, -- desconto, cashback, combo
 target_segment text, -- VIP, Ocasional, Inativo
 expected_roi numeric,
 expected_revenue numeric,
 expected_engagement numeric,
 created_at timestamptz DEFAULT now()
);

-- Interações com campanhas (para medir engajamento)
CREATE TABLE campaign_interactions (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 campaign_id uuid NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
 customer_id uuid NOT NULL REFERENCES customers(id),
 interaction_type text, -- visualizou, clicou, comprou
 interacted_at timestamptz DEFAULT now()
);

-- Avaliações textuais (para análise de sentimento)
CREATE TABLE reviews (
 id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 customer_id uuid NOT NULL REFERENCES customers(id),
 restaurant_id uuid NOT NULL REFERENCES restaurants(id),
 review_text text,
 sentiment_score numeric, -- -1 a +1
 created_at timestamptz DEFAULT now()
);

-- Índices para consultas de dashboard
CREATE INDEX idx_orders_restaurant ON orders(restaurant_id);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
