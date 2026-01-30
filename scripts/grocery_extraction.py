import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()
USER_AGENT = os.getenv("USER_AGENT")
FROM = os.getenv("FROM")

class RequestHandler():
    url: str = ""
    headers = {
        "User-Agent": USER_AGENT,
        'From': FROM
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
    grocery_dict = {}

    def extract_rema_groceries(self):

        self.grocery_dict["rema_1000"] = {}

        # Extract Rema 1000 groceries
        try:
            resp = self.request_handler.get("https://cphapp.rema1000.dk/api/v3/departments")
        except Exception as e:
            print(e)

        # Iterate each category(department), to extract each grocery within category
        for elements in resp["data"]:

            category_name = elements["name"]
            last_page = 0

            try:
                # Extract first page of products within category
                groceries_resp = self.request_handler.get(f'https://cphapp.rema1000.dk/api/v3/departments/{elements["id"]}/products?page=1')
            except Exception as e:
                print("An error occured during extraction. Skipping to next item: ", e)
                continue

            # extract last page from meta data
            last_page = groceries_resp["meta"]["pagination"]["last_page"]

            # Extract all products from first request
            self.grocery_dict["rema_1000"][category_name] = groceries_resp["data"]
            
            
            for page in range(2,last_page+1):
                # Append products from the last pages in the category
                print(f"Category: {category_name}, adding page: {page}")
                groceries_resp = self.request_handler.get(f'https://cphapp.rema1000.dk/api/v3/departments/{elements["id"]}/products?page={page}')
                self.grocery_dict["rema_1000"][category_name].extend(groceries_resp["data"])

    def create_json_file(self):
        '''
        Write generated grocery_dict to a json file for later transformation
        '''
        with open("grocery_json", "w") as f:
            json.dump(self.grocery_dict, f, indent=2)