import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


class GroceryScraper():
    '''
    GroceryScraper: A web-scraper to scrape for groceries.
    
    At first it will only be able to scrape major danish grocery stores.
    '''
    def main(self):

        options = Options()
        options.add_argument("--headless") # Runs without opening a window
        driver = webdriver.Chrome(options=options)

        driver.get("https://shop.rema1000.dk/avisvarer/")
        time.sleep(5) # Give the JavaScript a few seconds to load the products

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        print(soup)
        # Now you can pass 'html' into BeautifulSoup
        driver.quit()
         
        
        



GroceryScraper().main()