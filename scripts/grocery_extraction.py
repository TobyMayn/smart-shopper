import requests


class RequestHandler():
    url: str = ""
    headers = {
        "User-Agent": "Smart Shopper 1.0",
        'From': 'compilercrafts@gmail.com'
    }

    def get(self, endpoint: str) -> dict:
        self.url = endpoint

        try:
            response: requests.Response = requests.get(self.url, headers=self.headers)
        except Exception:
            raise Exception(f"An error occured when trying to retrieve information from {self.url}")
        
        if not response.ok:
            raise Exception(f"An error occured when trying to retrieve information from {self.url}. HTTP Status Code: {response.status_code}")
        
        
        return response.json()
        



class GroceryExtraction():
    
    request_handler = RequestHandler()

    try:
        resp = request_handler.get("https://cphapp.rema1000.dk/api/v3/departments")
        print(resp["data"])
    except Exception as e:
        print(e)


GroceryExtraction()