
import requests


class GroceryETL():
    '''
    GroceryETL: Simple ETL pipeline to extract groceries from grocery stores, transform the data and load it into the database.
    '''
    def main(self):
        response = requests.get("https://cphapp.rema1000.dk/api/v3/departments")
        print(response.text)

        
        



GroceryETL().main()