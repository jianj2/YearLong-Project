import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_adminHomePage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("chromedriver.exe")
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

    def test_introductionTab(self):
        introduction = self.driver.find_element_by_class_name("sidebar-ssq-introduction")
        introduction.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Introduction" in self.driver.current_url)

    def test_navbar_left(self):
        navbar_left = self.driver.find_element_by_class_name("navbar-left")
        navbar_left.click()
        time.sleep(2)
        assert ("http://localhost:3000" in self.driver.current_url)

    def test_edit_questionnaire(self):
        edit = self.driver.find_element_by_class_name("button")
        edit.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/75bea290-a6c4-11ea-90b9-4720072c0f8f/edit" in self.driver.current_url)

    def test_view_questionnaire(self):
        view = self.driver.find_element_by_class_name("questionnaire-list-item")
        view.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/standard/75bea290-a6c4-11ea-90b9-4720072c0f8f/view" in self.driver.current_url)

    def test_edit_instructions_title(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        title = self.driver.find_element_by_class_name("Instruction-title").find_element_by_id("filled-required")
        title.click()
        time.sleep(2)

    def test_edit_instructions_content(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        content = self.driver.find_element_by_class_name("Instruction-contents").find_element_by_id("filled-required")
        content.click()
        time.sleep(2)

    def test_instructions_save(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        assert "Successfully edited!" in self.driver.find_element_by_class_name("center-text").text

    def test_instructions_save_ok(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        assert "Successfully edited!" in self.driver.find_element_by_class_name("center-text").text
        ok = self.driver.find_element_by_class_name("buttons-container").find_element_by_class_name("button")
        ok.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_instructions_cancel(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        assert "Are you sure you want to cancel the editing?" in self.driver.find_element_by_class_name("center-text").text

    def test_instructions_cancel_yes(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        assert "Are you sure you want to cancel the editing?" in self.driver.find_element_by_class_name("center-text").text
        yes = self.driver.find_element_by_id("margin-button-yes")
        yes.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_instructions_cancel_no(self):
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        assert "Are you sure you want to cancel the editing?" in self.driver.find_element_by_class_name("center-text").text
        no = self.driver.find_element_by_id("margin-button-no")
        no.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
