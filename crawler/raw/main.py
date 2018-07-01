import os
import requests
import csv
from bs4 import BeautifulSoup
import numpy as np

# url = 'http://www.topdesignmag.com/superb-pictures-with-all-the-national-capitals-of-the-world/'
# r = requests.get(url)
# soup = BeautifulSoup(r.text, 'html.parser')
# # print(soup.prettify())

# src = []
# for i, link in enumerate(soup.find_all('img')):
#     src.append(str(link.get('src')))
#     if link.get('src') == 'http://www.topdesignmag.com/wp-content/uploads/2011/01/150.jpg':
#         print('start: ', i)
#     if link.get('src') == 'http://www.topdesignmag.com/wp-content/uploads/2011/01/3241.jpg':
#         print('end: ', i)

# print(len(src))
# src = src[2:241]
# f = open('img.csv', 'a')
# for i, link in enumerate(src):
#     f.write(str(i) + ',' + link + '\n')

# h2 = []

# for i, title in enumerate(soup.find_all('h2')):
#     h2.append(str(title))
# print(len(h2))

# h2 = h2[1:15] + h2[16:-1]
# f = open('name.csv', 'a')
# for i, title in enumerate(h2):
#     f.write(str(i) + ',' + title + '\n')


img = open('img.csv', 'r')
name = open('name.csv', 'r')
rows = csv.DictReader(img)
rows2 = csv.DictReader(name)

im = []
for row in rows:
    im.append(row['img'])
# print(im)

cap = []
coun = []
for row2 in rows2:
    cap.append(row2['capital'])
    coun.append(row2['country'])

f = open('image.csv', 'a')
for i in range(len(cap)):
    f.write(str(i) + ',' + coun[i] + ',' + cap[i] + ',' + im[i] + '\n')
