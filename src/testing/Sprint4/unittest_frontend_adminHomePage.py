import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_adminHomePage(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/admin")
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)

    def test_questionnaireTab(self):
        questionnaire = self.driver.find_element_by_class_name("sidebar-questionnaires")
        questionnaire.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Questionnaires" in self.driver.current_url)

    def test_instructionsTab(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_organisationTab(self):
        introduction = self.driver.find_element_by_class_name("sidebar-organisation ")
        introduction.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Organisation" in self.driver.current_url)

    def test_view_questionnaire(self):
        view = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        view.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Questionnaire/standard/1d2a95a0-082e-11eb-a69a-2d6c84ab30fa/view" in self.driver.current_url)

    def test_edit_questionnaire(self):
        edit = self.driver.find_elements_by_class_name("button")[2]
        edit.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Questionnaire/standard/1d2a95a0-082e-11eb-a69a-2d6c84ab30fa/edit" in self.driver.current_url)

    def test_copy_delete_confirm_questionnaire(self):
        copy = self.driver.find_elements_by_class_name("button")[3]
        copy.click()
        time.sleep(2)
        assert self.driver.find_elements_by_class_name("questionnaire-list-item")[4]
        delete = self.driver.find_elements_by_class_name("button")[4]
        delete.click()
        time.sleep(2)
        yes = self.driver.find_elements_by_id("margin-button")[0]
        yes.click()
        time.sleep(2)

    def test_addNew_questionnaire(self):
        addNew = self.driver.find_elements_by_class_name("button")[1]
        addNew.click()
        time.sleep(2)

    def test_delete_cancel_questionnaire(self):
        delete = self.driver.find_elements_by_class_name("button")[4]
        delete.click()
        time.sleep(2)
        cancel = self.driver.find_elements_by_id("margin-button")[1]
        cancel.click()
        time.sleep(2)

    def test_select_instructions(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        item = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        item.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/instruction/CC/edit" in self.driver.current_url)


    def test_edit_instructions_title(self):
        self.driver.get("http://localhost:3000/admin/SSQ_Instructions/CC/edit")
        title = self.driver.find_element_by_class_name("Instruction-title").find_element_by_id("filled-required")
        title.click()
        time.sleep(2)

    def test_edit_instructions_content(self):
        self.driver.get("http://localhost:3000/admin/instruction/CC/edit")
        content = self.driver.find_element_by_class_name("Instruction-contents").find_element_by_id("filled-required")
        content.click()
        time.sleep(2)

    def test_instructions_save(self):
        self.driver.get("http://localhost:3000/admin/instruction/CC/edit")
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        assert "Successfully edited!" in self.driver.find_element_by_class_name("center-text").text

    def test_instructions_save_ok(self):
        self.driver.get("http://localhost:3000/admin/instruction/CC/edit")
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        assert "Successfully edited!" in self.driver.find_element_by_class_name("center-text").text
        ok = self.driver.find_element_by_class_name("buttons-container").find_element_by_class_name("button")
        ok.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_organisation_country(self):
        self.driver.get("http://localhost:3000/admin/Organisation")
        item = self.driver.find_elements_by_class_name("country-list-item")[0]
        item.click()
        time.sleep(2)
        assert "http://localhost:3000/admin/Organisation/AUSTRALIA" in self.driver.current_url

    def test_organisation_country_organisation(self):
        self.driver.get("http://localhost:3000/admin/Organisation/AUSTRALIA")
        item = self.driver.find_elements_by_class_name("organisation-list-item")[0]
        item.click()
        time.sleep(2)
        assert "http://localhost:3000/admin/Organisation/AUSTRALIA/aus" in self.driver.current_url


    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
