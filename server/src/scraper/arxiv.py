import requests
import re
from bs4 import BeautifulSoup


class ArxivScraper():
    def __init__(self, url):
        response = requests.get(url)
        self.soup = BeautifulSoup(response.text, "html.parser")


    def get_year(self):
        soup2 = self.soup.findAll("div", {'class': 'dateline'})
        print(soup2)
        print(soup2[0].text)
        print(dir(soup2))
        dateline_text = soup2[0].text
        year = re.findall(r'\d{4}', dateline_text)[0]
        year = int(year)
        return year

    def get_conference(self):
        # Accept by 
        # Accepted for publication at 
        # Neural Information Processing Systems 2023
        # to be published in 37th Conference on Neural Information Processing Systems (NeurIPS 2023)

        # 1. extract 'Comments:' 
        # 2. do some regex
        # 3. map to a set list of conferences using dict 

        # we will deal with it later
        return

    def get_authors(self):
        # not needed atm
        return


if __name__ == '__main__':
    scraped_website = ArxivScraper('http://arxiv.org/abs/2104.13841v1')
    year = scraped_website.get_year()



