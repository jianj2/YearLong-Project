import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_clinicianSignup(unittest.TestCase):

    def setUp(self):
        # self.driver = webdriver.Chrome("../chromedriver_mac")  # for mac
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.driver.get("http://localhost:3000/clinician")
        button = self.driver.find_element_by_link_text("Signup")
        button.click()

    def test_firstName(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        time.sleep(2)

    def test_lastName(self):
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        time.sleep(2)

    def test_organisation(self):
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        time.sleep(2)

    def test_password(self):
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        time.sleep(2)

    def test_confirmPassword(self):
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        time.sleep(2)

    def test_email(self):
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("email@gmail.com")
        time.sleep(2)

    def test_empty_firstName(self):
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("emailt3@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Please enter your First Name." \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_empty_lastName(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("emailt2@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Please enter your Last name." \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_empty_organisation(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("emailt1@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Please enter your organisation" \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_empty_email(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "You must enter a valid email address." \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_empty_password(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("email@gmail.com")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("samplePassword1")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Passwords do not match!" \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_empty_confirmPassword(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("samplePassword1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("email@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Passwords do not match!" \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_passwordFormat(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("email1@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Your password must be strong with at least 8 characters containing 1 uppercase, 1 lowercase and 1 numeric character." \
               in self.driver.find_element_by_id("error-message-signup").text

    def test_validInput(self):
        firstName = self.driver.find_element_by_id("fname")
        firstName.send_keys("First")
        lastName = self.driver.find_element_by_id("lname")
        lastName.send_keys("Last")
        organisation = self.driver.find_element_by_id("organisation")
        organisation.send_keys("organisation")
        password = self.driver.find_element_by_id("signup-password")
        password.send_keys("Password1")
        confirmPassword = self.driver.find_element_by_id("cpassword")
        confirmPassword.send_keys("Password1")
        email = self.driver.find_element_by_id("signup-email")
        email.send_keys("emailv0@gmail.com")
        signup = self.driver.find_element_by_id("btn-signup")
        signup.click()
        time.sleep(2)
        assert "Authorize Pediatric Scale" in self.driver.title


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()

