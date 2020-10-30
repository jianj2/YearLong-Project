import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_clinicianLogin(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/clinician")

    def test_landingLogo_left(self):
        landingLogo = self.driver.find_element_by_class_name("landing-logo")
        landingLogo.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

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

    def test_select_email(self):
        email = self.driver.find_element_by_id("email")
        email.click()
        time.sleep(2)

    def test_input_email(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("test_email@google.com")
        time.sleep(2)

    def test_login_with_correct_format_email(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("test_email@google.com")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Please enter your password." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_login_with_wrong_format_email(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("test_email")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Please enter your password." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_select_password(self):
        password = self.driver.find_element_by_id("password")
        password.click()
        time.sleep(2)

    def test_input_password(self):
        password = self.driver.find_element_by_id("password")
        password.send_keys("test_password")
        time.sleep(2)

    def test_login_with_correct_format_password(self):
        password = self.driver.find_element_by_id("password")
        password.send_keys("Password123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Please enter your email address." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_login_with_wrong_format_password(self):
        password = self.driver.find_element_by_id("password")
        password.send_keys("test_password")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Please enter your email address." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_login_without_input(self):
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Please enter your email address." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_login_with_invalid_input(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest1")
        password = self.driver.find_element_by_id("password")
        password.send_keys("1")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Wrong email or password." \
               in self.driver.find_element_by_id("error-message-login").text

    def test_login_with_valid_input(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "http://localhost:3000" in self.driver.current_url

    def test_logout(self):
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        logout = self.driver.find_element_by_class_name("button")
        logout.click()
        time.sleep(2)
        assert "http://localhost:3000" in self.driver.current_url

    def test_forgetPassword(self):
        forget = self.driver.find_element_by_id("btn-password-find")
        forget.click()
        time.sleep(2)
        assert ("http://localhost:3000/findPassword" in self.driver.current_url)

    def test_forgetPassword_navbar(self):
        self.driver.get("http://localhost:3000/findPassword")
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_forgetPassword_selectEmail(self):
        self.driver.get("http://localhost:3000/findPassword")
        email = self.driver.find_element_by_class_name("MuiInputBase-root")
        email.click()
        time.sleep(2)

    def test_forgetPassword_enterEmail(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        email = self.driver.find_element_by_class_name("MuiInputBase-input")
        email.send_keys("test_email")
        time.sleep(2)

    def test_forgetPassword_submitWithoutInput(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("button")
        submit.click()
        time.sleep(2)
        assert "error" in self.driver.find_elements_by_class_name("MuiTypography-root")[1].text

    def test_forgetPassword_submitWithInput(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("button")
        submit.click()
        time.sleep(2)
        email = self.driver.find_element_by_class_name("MuiInputBase-input")
        email.send_keys("test_email")
        time.sleep(2)
        assert "Request sent successfully!" in self.driver.find_elements_by_class_name("MuiTypography-root")[1].text

    def test_forgetPassword_submitOk(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("button")
        submit.click()
        time.sleep(2)
        email = self.driver.find_element_by_class_name("MuiInputBase-input")
        email.send_keys("test_email")
        time.sleep(2)
        ok = self.driver.find_element_by_class_name("MuiButtonBase-root")
        ok.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name(" login-box ")

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
