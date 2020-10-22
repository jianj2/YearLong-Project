import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_adminLoginPage(unittest.TestCase):

    def setUp(self):

        # self.driver = webdriver.Chrome("../chromedriver_mac")  # for mac
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.driver.get("http://localhost:3000/admin")

    def test_select_username(self):
        username = self.driver.find_element_by_name("username")
        username.click()
        time.sleep(2)

    def test_input_username(self):
        username = self.driver.find_element_by_name("username")
        username.send_keys("test_username")
        time.sleep(2)

    def test_return_with_only_username(self):
        username = self.driver.find_element_by_name("username")
        username.send_keys("test_username")
        username.send_keys(Keys.RETURN)
        time.sleep(2)

    def test_select_password(self):
        password = self.driver.find_element_by_name("password")
        password.click()
        time.sleep(2)

    def test_input_password(self):
        password = self.driver.find_element_by_name("password")
        password.send_keys("test_password")
        time.sleep(2)

    def test_return_with_only_password(self):
        password = self.driver.find_element_by_name("password")
        password.send_keys("test_password")
        password.send_keys(Keys.RETURN)
        time.sleep(2)

    def test_MuiIconButton_without_input_password(self):
        MuiIconButton = self.driver.find_element_by_class_name("MuiIconButton-label")
        MuiIconButton.click()
        time.sleep(2)

    def test_MuiIconButton_with_input_password(self):
        password = self.driver.find_element_by_name("password")
        password.send_keys("test_password")
        MuiIconButton = self.driver.find_element_by_class_name("MuiIconButton-label")
        MuiIconButton.click()
        time.sleep(2)

    def test_enterButton_without_input(self):
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)

    def test_enterButton_with_input(self):
        username = self.driver.find_element_by_name("username")
        username.send_keys("test_username")
        password = self.driver.find_element_by_name("password")
        password.send_keys("test_password")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)

    def test_login_success(self):
            username = self.driver.find_element_by_name("username")
            username.send_keys("AdminUser1")
            password = self.driver.find_element_by_name("password")
            password.send_keys("pw1234")
            enter = self.driver.find_element_by_class_name("button")
            enter.click()
            time.sleep(2)
            assert ("http://localhost:3000/admin/Questionnaires" in self.driver.current_url)

    def test_logout(self):
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        logout = self.driver.find_element_by_class_name("button")
        logout.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
