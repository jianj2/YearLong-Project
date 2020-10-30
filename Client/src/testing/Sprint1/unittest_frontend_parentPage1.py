import unittest
from selenium import webdriver
from configparser import ConfigParser

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_parentPage1(unittest.TestCase):

    def setUp(self):

        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/participant/:questionnaireId/:clinicianEmail")

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_nextButton_forPage1(self):
        next_button = self.driver.find_element_by_class_name("button")
        next_button.click()
        time.sleep(2)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()