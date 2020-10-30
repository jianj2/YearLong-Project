import unittest
from selenium import webdriver
from configparser import ConfigParser

from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_clinicianAfterLoginPage(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/clinician")
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)


    def test_questionnaireButton(self):
        questionnaire_button = self.driver.find_element_by_class_name\
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Questionnaires" \
            in self.driver.current_url

    def test_navbar_left_afterClick_questionnaireButton(self):
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_logout_afterClick_questionnaireButton(self):
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        logout = self.driver.find_element_by_class_name("button")
        logout.click()
        time.sleep(2)
        assert "http://localhost:3000" in self.driver.current_url

    def test_doTheTestButton_afterClick_questionnaireButton(self):
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/DoTheTest" in self.driver.current_url

    def test_instructionButton_afterClick_questionnaireButton(self):
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Instructions" in self.driver.current_url

    def test_doTheTestButton(self):
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/DoTheTest" in self.driver.current_url

    def test_navbar_left_afterClick_doTheTestButton(self):
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_logout_afterClick_doTheTestButton(self):
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        logout = self.driver.find_element_by_class_name("button")
        logout.click()
        time.sleep(2)
        assert "http://localhost:3000" in self.driver.current_url

    def test_questionnaireButton_afterClick_doTheTestButton(self):
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Questionnaires" in self.driver.current_url

    def test_instructionButton_afterClick_doTheTestButton(self):
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Instructions" in self.driver.current_url

    def test_instructionButton(self):
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Instructions" in self.driver.current_url

    def test_navbar_left_afterClick_doTheTestButton(self):
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_logout_afterClick_instructionButton(self):
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        logout = self.driver.find_element_by_class_name("button")
        logout.click()
        time.sleep(2)
        assert "http://localhost:3000" in self.driver.current_url

    def test_questionnaireButton_afterClick_instructionButton(self):
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        questionnaire_button = self.driver.find_element_by_class_name \
            ("sidebar-questionnaires")
        questionnaire_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/Questionnaires" in self.driver.current_url

    def test_doTheTestButton_afterClick_instructionButton(self):
        instruction_button = self.driver.find_element_by_class_name \
            ("sidebar-instructions")
        instruction_button.click()
        time.sleep(2)
        doTheTest_button = self.driver.find_element_by_class_name \
            ("sidebar-do-the-test")
        doTheTest_button.click()
        time.sleep(2)
        assert "http://localhost:3000/clinician/DoTheTest" in self.driver.current_url



    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
