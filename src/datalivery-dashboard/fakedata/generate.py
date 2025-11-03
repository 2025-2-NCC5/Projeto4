#!/usr/bin/env python3
import argparse, random, uuid
from faker import Faker
import psycopg2
from tqdm import tqdm
from datetime import datetime, timedelta
fake = Faker()
Faker.seed(1234)
random.seed(1234)
def create_restaurants(cur, n_rest=50):
   ids = []
   for _ in range(n_rest):
       rid = str(uuid.uuid4())
       ids.append(rid)
       cur.execute(
           "INSERT INTO restaurants(id, name, city) VALUES (%s, %s, %s)",
           (rid, fake.company() + " Restaurante", fake.city())
       )
   return ids
def create_customers(cur, n_cust=2000):
   ids = []
   for _ in range(n_cust):
       cid = str(uuid.uuid4())
       ids.append(cid)
       lat = round(random.uniform(-23.7, -22.9), 6)  # exemplo SP region
       lon = round(random.uniform(-46.8, -46.2), 6)
       cur.execute(
           "INSERT INTO customers(id, name, email, phone, city, lat, lon) VALUES (%s,%s,%s,%s,%s,%s,%s)",
           (cid, fake.name(), fake.email(), fake.phone_number(), fake.city(), lat, lon)
       )
   return ids
def create_menu_items(cur, restaurants, per_rest_min=8, per_rest_max=20):
   items = []
   for r in restaurants:
       n = random.randint(per_rest_min, per_rest_max)
       for _ in range(n):
           mid = str(uuid.uuid4())
           name = random.choice([
            "Hambúrguer", "Pizza", "Sushi", "Pastel", "Tapioca", "Açaí", "Salada", 
            "Sanduíche", "Coxinha", "Kibe", "Esfiha", "Torta", "Brownie", "Sorvete", 
            "Milkshake", "Macarrão", "Risoto", "Lasanha", "Poke", "Wrap"
            ]) + f" {fake.word()}"
           price = round(random.uniform(8, 120), 2)
           items.append((mid, r, price))
           cur.execute("INSERT INTO menu_items(id, restaurant_id, name, price) VALUES (%s,%s,%s,%s)", (mid, r, name, price))
   return items
def mk_nps_from_rating(rating):
   # simples: map rating 1-5 to nps -100..100 approx
   if rating >= 5: return random.randint(70,100)
   if rating == 4: return random.randint(30,69)
   if rating == 3: return random.randint(-10,29)
   return random.randint(-100,-11)
def create_orders(cur, restaurants, customers, menu_items, n_orders=12000):
   for _ in tqdm(range(n_orders), desc="Inserting orders"):
       oid = str(uuid.uuid4())
       r = random.choice(restaurants)
       c = random.choice(customers)
       created_at = datetime.utcnow() - timedelta(days=random.randint(0,180), seconds=random.randint(0,86400))
       n_items = random.randint(1,4)
       chosen_items = [random.choice([mi for mi in menu_items if mi[1]==r]) for _ in range(n_items)]
       order_value = sum(i[2] * random.randint(1,3) for i in chosen_items)
       delivery_time = max(10, int(random.gauss(35, 12)))
       rating = random.choices([5,4,3,2,1], weights=[0.45,0.25,0.15,0.1,0.05])[0]
       nps = mk_nps_from_rating(rating)
       cur.execute(
           "INSERT INTO orders(id, restaurant_id, customer_id, order_value, delivery_time_minutes, rating, nps_score, created_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
           (oid, r, c, round(order_value,2), delivery_time, rating, nps, created_at)
       )
       for mi in chosen_items:
           iid = str(uuid.uuid4())
           qty = random.randint(1,2)
           price = mi[2]
           cur.execute("INSERT INTO order_items(id, order_id, menu_item_id, quantity, price) VALUES (%s,%s,%s,%s,%s)", (iid, oid, mi[0], qty, price))
def main():
   parser = argparse.ArgumentParser()
   parser.add_argument("--host", default="localhost")
   parser.add_argument("--port", default=5432, type=int)
   parser.add_argument("--user", default="postgres")
   parser.add_argument("--password", default="1234")
   parser.add_argument("--db", default="datalivery")
   parser.add_argument("--orders", default=12000, type=int)
   args = parser.parse_args()
   conn = psycopg2.connect(host=args.host, port=args.port, user=args.user, password=args.password, dbname=args.db)
   conn.autocommit = True
   cur = conn.cursor()
   print("Creating restaurants...")
   restaurants = create_restaurants(cur, n_rest=50)
   print("Creating customers...")
   customers = create_customers(cur, n_cust=2000)
   print("Creating menu items...")
   menu_items = create_menu_items(cur, restaurants, per_rest_min=8, per_rest_max=20)
   print(f"Creating {args.orders} orders...")
   create_orders(cur, restaurants, customers, menu_items, n_orders=args.orders)
   cur.close()
   conn.close()
   print("Done.")
if __name__ == "__main__":
   main()