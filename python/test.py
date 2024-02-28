import requests
import time

def get_items():
    url = 'http://localhost:9000/items'
    try:
        response = requests.get(url)
        response.raise_for_status()  # レスポンスコードが 200 以外の場合はエラーを発生させる
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return

    data = response.json()
    if "items" in data:
        items  = data["items"]
        items_key = ['id','name','category','image_name']
        for item in items:
            for key in items_key:
                if key not in item:
                    print(f'Error item = {item} does not contain {key}')
                    return
        print('All responses are valid')
    else:
        print("Error: Response key 'items' not found")

while True:
    get_items()
    time.sleep(15)
