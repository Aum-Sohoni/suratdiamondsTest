
import csv

targets = ['seraphine-emerald-channel-bolo-bracelet', 'aureline-emerald-bar-bolo-bracelet']
csv_path = r'c:\Users\aum11\Downloads\SuratDiamonds\suratdiamondLV-main\src\ProductsCSV\products_export_1.csv'

with open(csv_path, mode='r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        if row['Handle'] in targets:
            print(f"Handle: {row['Handle']}, Price: {row['Variant Price']}")
