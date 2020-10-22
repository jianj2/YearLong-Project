import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_parentPage4(unittest.TestCase):

    def setUp(self):

        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/participant/:questionnaireId/:clinicianEmail")
        next_button = self.driver.find_element_by_class_name("button")
        next_button.click()
        time.sleep(2)
        childName = self.driver.find_element_by_name("name")
        childName.send_keys("Daniel")
        date = self.driver.find_element_by_name("date")
        date.send_keys("202000/06/13")
        completedBy = self.driver.find_element_by_name("completedBy")
        completedBy.send_keys("Parent")
        rightDeviceType = self.driver.find_element_by_name("rightDeviceType")
        rightDeviceType.send_keys("Device A")
        leftDeviceType = self.driver.find_element_by_name("leftDeviceType")
        leftDeviceType.send_keys("Device A")
        next_button2 = self.driver.find_element_by_id("next")
        next_button2.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_backButton(self):
        back_button = self.driver.find_element_by_id("back")
        back_button.click()
        time.sleep(2)

    def test_submitButton(self):
        submit_button = self.driver.find_element_by_id("submit")
        submit_button.click()
        time.sleep(2)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()