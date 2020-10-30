import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_loginPage(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000")

    def test_clinician_login(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        assert "Client Log In: Pediatric SSQ" in self.driver.title

    def test_admin_login(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin" in self.driver.current_url)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
