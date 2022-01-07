import os
import uuid
from bing_image_downloader import downloader
import csv


QUERIES = ["Nike Tiempo Legend",
        "Nike Mercurial Superfly 8",
        "Adidas Predator 19",
        "Adidas Predator Mutator",
        "Adidas Predator Freak",
        "Adidas Copa"]

# {dir:label}
LABELS = {'tiempo':'Nike-Tiempo-Legend',
        'superfly': 'Nike-Superfly-8',
        'mutator-freak': 'Adidas-Predator-Mutator-Freak',
        'pred19': 'Adidas-Predator-19',
        'copa': 'Adidas-Copa-Mundial'}


def scrape_images(query):
    for q in query:
        downloader.download(q, limit=100,  output_dir="images/", adult_filter_off=True, force_replace=False, timeout=60, verbose=True)

def label_images(dir_labels):
    with open('labels.csv', mode='a') as labels_file:
        labels_file = csv.writer(labels_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        labels_file.writerow(['id', 'boot'])

        for dir in dir_labels:
            print(dir)
            for file in os.listdir(f"./images/{dir}"):
                split = os.path.splitext(file)
                fname, ext = (split[0],split[1].lower())

                if ext in ['.jpg', '.jpeg','.png']:
                    id = f"{uuid.uuid4()}{ext}"

                    labels_file.writerow([id, dir_labels[dir]])

                    os.rename(f"./images/{dir}/{file}", f"./images/{dir}/{id}")

# RUN
# scrape_images(QUERIES)

# Combine freak-mutator directories and simplify dir names
label_images(LABELS)
