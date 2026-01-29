
import os
import requests
from dotenv import load_dotenv

load_dotenv()

url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_PUBLISHABLE_KEY")

if not url or not key:
    print("Missing environment variables.")
    exit(1)

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}"
}

response = requests.get(f"{url}/rest/v1/products?price=eq.0&select=id,name,price,description", headers=headers)

if response.status_code == 200:
    products = response.json()
    for p in products:
        print(f"ID: {p['id']}, Name: {p['name']}, Price: {p['price']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
