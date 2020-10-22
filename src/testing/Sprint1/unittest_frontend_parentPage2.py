import unittest
from selenium import webdriver
from configparser import ConfigParser

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_parentPage2(unittest.TestCase):

    def setUp(self):

        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/parent/:questionnaireId/:clinicianEmail")
        next_button = self.driver.find_element_by_class_name("button")
        next_button.click()
        time.sleep(2)

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_instructionButton_forPage2(self):
        instructions_button = self.driver.find_element_by_id("instructions")
        instructions_button.click()
        time.sleep(2)

    def test_backButton_forPage2(self):
        back_button = self.driver.find_element_by_id("back")
        back_button.click()
        time.sleep(2)

    def test_nextButton_withoutInput(self):
        next_button2 = self.driver.find_element_by_id("next")
        next_button2.click()
        time.sleep(2)

    def test_select_childName(self):
        childName = self.driver.find_element_by_name("name")
        childName.click()
        time.sleep(2)

    def test_input_childName(self):
        childName = self.driver.find_element_by_name("name")
        childName.send_keys("Daniel")
        time.sleep(2)

    def test_select_date(self):
        date = self.driver.find_element_by_name("date")
        date.click()
        time.sleep(2)

    def test_input_date(self):
        date = self.driver.find_element_by_name("date")
        date.send_keys("2020/06/13")
        time.sleep(2)

    def test_select_completedBy(self):
        completedBy = self.driver.find_element_by_name("completedBy")
        completedBy.click()
        time.sleep(2)

    def test_input_Parent_completedBy(self):
        completedBy = self.driver.find_element_by_name("completedBy")
        completedBy.send_keys("Parent")
        time.sleep(2)

    def test_input_Child_completedBy(self):
        completedBy = self.driver.find_element_by_name("completedBy")
        completedBy.send_keys("Child")
        time.sleep(2)

    def test_select_rightDeviceType(self):
        rightDeviceType = self.driver.find_element_by_name("rightDeviceType")
        rightDeviceType.click()
        time.sleep(2)

    def test_input_DeviceA_rightDeviceType(self):
        rightDeviceType = self.driver.find_element_by_name("rightDeviceType")
        rightDeviceType.send_keys("Device A")
        time.sleep(2)

    def test_input_DeviceB_rightDeviceType(self):
        rightDeviceType = self.driver.find_element_by_name("rightDeviceType")
        rightDeviceType.send_keys("Device B")
        time.sleep(2)

    def test_select_leftDeviceType(self):
        leftDeviceType = self.driver.find_element_by_name("leftDeviceType")
        leftDeviceType.click()
        time.sleep(2)

    def test_input_DeviceA_leftDeviceType(self):
        leftDeviceType = self.driver.find_element_by_name("leftDeviceType")
        leftDeviceType.send_keys("Device A")
        time.sleep(2)

    def test_input_DeviceB_leftDeviceType(self):
        leftDeviceType = self.driver.find_element_by_name("leftDeviceType")
        leftDeviceType.send_keys("Device B")
        time.sleep(2)

    def test_next_withinput(self):
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
        time.sleep(2)
        next_button2 = self.driver.find_element_by_id("next")
        next_button2.click()
        time.sleep(2)



    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()