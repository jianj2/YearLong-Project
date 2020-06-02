import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class sample_test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.driver.get("http://localhost:3000/parent/:questionnaireId/:clinicianEmail")

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(5)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_nextButton_forPage1(self):
        next_button = self.driver.find_element_by_class_name("button")
        next_button.click()
        time.sleep(5)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()