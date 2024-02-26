import requests
"""
curl -X GET \
    --url 'http://localhost:9000/items' \
"""

url = 'http://localhost:9000/items'
response = requests.get(url)

if response.status_code == 200:
    data = dict(response.json())
    if "items" in data.keys():
        items  = data["items"]#items[0] = {keys:value}
        items_key = ['id','name','category','image_name']
        for item in items:
            for key in items_key:
                if key in item.keys():
                    pass
                else:
                    print(f'Error item = {item} does not contain {key}')
                    exit()
        print('all response are valid')

    else:
        print("Error response key 'items' not added")
else:
    print('Error:', response.status_code)