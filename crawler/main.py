import os
import json
import csv

with open('data.json') as f:
    data = json.load(f)

name = []
for i in range(len(data)):
    # print(data[i]["name"]["common"])
    name.append(data[i]["name"]["common"])

img = open('image.csv', 'r')

coun = []
# lines = []
mydict = {}
for line in img.readlines():
    # print(line)
    # lines.append(line)
    country = line.split(',')[1]
    # print(country)
    coun.append(country)
    mydict[country] = line.split('\n')[0].split(',')[3]

# cnt = 239
# for i, c in enumerate(name):
#     if c not in coun:
#         print(str(cnt) + "," + c + ",None," + "http://www.topdesignmag.com/wp-content/uploads/2011/01/3241.jpg")
#         cnt += 1
# cnt is now 250

# for i, cou in enumerate(coun):
#     if cou not in name:
#         print(i, cou)

# data_new = []
# for i in range(len(data)):
#     d = data[i]
#     name = d["name"]["common"]
#     d['image'] = mydict[name]
#     data_new.append(d)
#     # print(data_new)
#     # print(data_new)
#     # break
#     if i == 3:
#         break
# print(data_new)