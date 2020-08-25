import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_adminLoginPage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.driver.get("http://localhost:3000/clinician")

    def test_select_loginTab(self):
        button = self.driver.find_element_by_link_text("Login")
        button.click()
        assert "L O G   I N" in self.driver.find_element_by_id("btn-login").text
        time.sleep(2)

    def test_select_SignupTab(self):
        button = self.driver.find_element_by_link_text("Signup")
        button.click()
        assert "S I G N   U P" in self.driver.find_element_by_id("btn-signup").text
        time.sleep(2)
    #
    # def test_select_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.click()
    #     time.sleep(2)
    #
    # def test_input_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("test_email@google.com")
    #     time.sleep(2)
    #
    # def test_login_with_correct_format_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("test_email@google.com")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Wrong email or password." \
    #            in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_correct_format_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("test_email@google.com")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "String (password) is too short (0 chars), minimum 1" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_login_with_wrong_format_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("test_email")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Wrong email or password." \
    #            in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_wrong_format_email(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("test_email")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "String (password) is too short (0 chars), minimum 1" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_select_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.click()
    #     time.sleep(2)
    #
    # def test_input_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("test_password")
    #     time.sleep(2)
    #
    # def test_login_with_correct_format_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Password123")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Need email" \
    #            in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_correct_format_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Password123")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "error in email - email format validation failed:" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_login_with_wrong_format_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("test_password")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Need email" \
    #            in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_wrong_format_password(self):
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("test_password")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "error in email - email format validation failed" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_without_input(self):
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "String (password) is too short (0 chars), minimum 1" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_invalid_input(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("unittest")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("1")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "error in email - email format validation failed: unittest" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_signup_with_valid_input(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("unittest2@gmail.com")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Unittest123")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "Authorize Pediatric Scale" in self.driver.title
    #
    # def test_signup_with_exist_account(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("jianj2@gmail.com")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Password123")
    #     signup = self.driver.find_element_by_id("btn-signup")
    #     signup.click()
    #     time.sleep(2)
    #     assert "Invalid sign up" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_login_without_input(self):
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Need email or password" \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_login_with_invalid_input(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("unittest")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("1")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "Wrong email or password." \
    #         in self.driver.find_element_by_id("error-message").text
    #
    # def test_login_with_valid_input(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("unittest2@gmail.com")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Unittest123")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "http://localhost:3000/clinician" in self.driver.current_url
    #
    # def test_logout(self):
    #     email = self.driver.find_element_by_id("email")
    #     email.send_keys("unittest2@gmail.com")
    #     password = self.driver.find_element_by_id("password")
    #     password.send_keys("Unittest123")
    #     login = self.driver.find_element_by_id("btn-login")
    #     login.click()
    #     time.sleep(2)
    #     assert "http://localhost:3000/clinician" in self.driver.current_url
    #     logout = self.driver.find_element_by_class_name("button")
    #     logout.click()
    #     time.sleep(2)
    #     assert "http://localhost:3000" in self.driver.current_url

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()

