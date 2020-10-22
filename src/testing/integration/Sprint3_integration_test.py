import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class Sprint3_integration_test(unittest.TestCase):

    def setUp(self):

        # self.driver = webdriver.Chrome("../chromedriver_mac")  # for mac
        self.driver = webdriver.Chrome("chromedriver.exe")
        self.driver.get("http://localhost:3000/")
        time.sleep(2)

    def test_login_empty_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("")
        password = self.driver.find_element_by_id("password")
        password.send_keys("")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Clinician Log In" in self.driver.find_element_by_id("tab-1").find_element_by_tag_name("h1").text

    def test_login_wrongEmail_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Clinician Log In" in self.driver.find_element_by_id("tab-1").find_element_by_tag_name("h1").text

    def test_login_wrongPassword_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("sample")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert "Clinician Log In" in self.driver.find_element_by_id("tab-1").find_element_by_tag_name("h1").text

    def test_login_correctInformation_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("content-container")

    def test_view_questionnaire_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        assert "http://localhost:3000/standard/0d59c9d0-e6c7-11ea-a7af-355badb8db84/view" in self.driver.current_url

    def test_add_delete_questionnaire_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        add = self.driver.find_elements_by_class_name("button")[1]
        add.click()
        time.sleep(2)
        delete = self.driver.find_elements_by_class_name("button")[3]
        delete.click()
        time.sleep(2)
        cancel = self.driver.find_elements_by_id("margin-button")[1]
        cancel.click()
        time.sleep(2)
        delete = self.driver.find_elements_by_class_name("button")[3]
        delete.click()
        time.sleep(2)
        confirm = self.driver.find_elements_by_id("margin-button")[0]
        confirm.click()
        time.sleep(2)


    def test_edit_cancel_questionnaire_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        edit = self.driver.find_elements_by_class_name("button")[2]
        edit.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        no = self.driver.find_elements_by_class_name("MuiButton-label")[1]
        no.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        no = self.driver.find_elements_by_class_name("MuiButton-label")[1]
        no.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        yes = self.driver.find_elements_by_class_name("MuiButton-label")[0]
        yes.click()
        time.sleep(2)

    def test_edit_save_questionnaire_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        edit = self.driver.find_elements_by_class_name("button")[2]
        edit.click()
        time.sleep(2)
        cancel = self.driver.find_element_by_id("edit-cancel-button")
        cancel.click()
        time.sleep(2)
        no = self.driver.find_elements_by_class_name("MuiButton-label")[1]
        no.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        no = self.driver.find_elements_by_class_name("MuiButton-label")[1]
        no.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        yes = self.driver.find_elements_by_class_name("MuiButton-label")[0]
        yes.click()
        time.sleep(2)

    def test_edit_questionnaire_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        edit = self.driver.find_elements_by_class_name("button")[2]
        edit.click()
        time.sleep(2)
        child = self.driver.find_elements_by_class_name("MuiTypography-root")[0]
        child.click()
        time.sleep(2)
        parent = self.driver.find_elements_by_class_name("MuiTypography-root")[1]
        parent.click()
        time.sleep(2)
        title = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        title.click()
        time.sleep(2)
        description = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        description.click()
        time.sleep(2)
        section = self.driver.find_elements_by_class_name("MuiExpansionPanelSummary-content")[0]
        section.click()
        time.sleep(2)
        scenario = self.driver.find_elements_by_class_name("MuiExpansionPanelSummary-content")[1]
        scenario.click()
        time.sleep(2)
        t1 = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        t1.click()
        time.sleep(2)
        t2 = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        t2.click()
        time.sleep(2)
        t3 = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        t3.click()
        time.sleep(2)
        t4 = self.driver.find_elements_by_class_name("MuiInputBase-input")[6]
        t4.click()
        time.sleep(2)
        t5 = self.driver.find_elements_by_class_name("MuiInputBase-input")[7]
        t5.click()
        time.sleep(2)
        addq = self.driver.find_elements_by_class_name("button")[4]
        addq.click()
        time.sleep(2)
        remove = self.driver.find_elements_by_id("questionTable-remove-button")[1]
        remove.click()
        time.sleep(2)
        adds = self.driver.find_elements_by_class_name("button")[5]
        adds.click()
        time.sleep(2)
        delete = self.driver.find_elements_by_class_name("button")[5]
        delete.click()
        time.sleep(2)
        add_ans = self.driver.find_element_by_class_name("add-answer-button")
        add_ans.click()
        time.sleep(2)

    def test_instruction_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        questionnaire = self.driver.find_element_by_class_name("sidebar-instructions")
        questionnaire.click()
        time.sleep(2)
        assert ("http://localhost:3000/clinician/Instructions" in self.driver.current_url)

    def test_share_empty_email_section_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert self.driver.find_element_by_class_name("share-modal-container")

    def test_share_empty_email_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("MuiTypography-root")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("MuiTypography-root")[1]
        s2.click()
        time.sleep(2)
        s3 = self.driver.find_elements_by_class_name("MuiTypography-root")[2]
        s3.click()
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert self.driver.find_element_by_class_name("share-modal-container")

    def test_share_empty_section_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert self.driver.find_element_by_class_name("share-modal-container")

    def test_share_with_oneSection_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("MuiTypography-root")[0]
        s1.click()
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert "http://localhost:3000/clinician/Share" in self.driver.current_url

    def test_share_with_twoSection_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("MuiTypography-root")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("MuiTypography-root")[1]
        s2.click()
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert "http://localhost:3000/clinician/Share" in self.driver.current_url

    def test_share_with_allSection_clinician(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        share = self.driver.find_element_by_class_name("sidebar-share")
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("MuiTypography-root")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("MuiTypography-root")[1]
        s2.click()
        time.sleep(2)
        s3 = self.driver.find_elements_by_class_name("MuiTypography-root")[2]
        s3.click()
        time.sleep(2)
        button = self.driver.find_elements_by_class_name("button")[5]
        button.click()
        time.sleep(5)
        assert "http://localhost:3000/clinician/Share" in self.driver.current_url

    def test_complete_enterPersonalDetails(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("scenario-container")

    def test_complete_nextWithoutInput(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_complete_backOnPage1(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        back = self.driver.find_elements_by_class_name("button")[1]
        back.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("questionnaire-list-container")

    def test_complete_reviewnPage2(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        review = self.driver.find_elements_by_class_name("button")[2]
        review.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("review-personal-details")

    def test_complete_backOnPage2(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        back = self.driver.find_elements_by_class_name("button")[1]
        back.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_complete_fillInQuestionnaire(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        slider = self.driver.find_elements_by_class_name("MuiSlider-thumb")[0]
        slider.click()
        time.sleep(2)
        multi1 = self.driver.find_elements_by_class_name("MuiFormControlLabel-root")[3]
        multi1.click()
        time.sleep(2)
        multi2 = self.driver.find_elements_by_class_name("MuiFormControlLabel-root")[7]
        multi2.click()
        time.sleep(2)

    def test_complete_backOnPage3(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        review = self.driver.find_elements_by_class_name("button")[2]
        review.click()
        time.sleep(2)
        back = self.driver.find_elements_by_class_name("button")[1]
        back.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("questionaire-container")

    def test_complete_SubmitOnPage3(self):
        clinician_login = self.driver.find_element_by_link_text("Clinician")
        clinician_login.click()
        time.sleep(2)
        email = self.driver.find_element_by_id("email")
        email.send_keys("unittest2@gmail.com")
        password = self.driver.find_element_by_id("password")
        password.send_keys("Unittest123")
        login = self.driver.find_element_by_id("btn-login")
        login.click()
        time.sleep(2)
        test = self.driver.find_element_by_class_name("sidebar-do-the-test")
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        rd.send_keys("None")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        review = self.driver.find_elements_by_class_name("button")[2]
        review.click()
        time.sleep(2)
        submit = self.driver.find_elements_by_class_name("button")[2]
        submit.click()
        time.sleep(10)
        assert self.driver.find_element_by_class_name("dothetest-submit")

    def test_enterButton_without_input_admin(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin" in self.driver.current_url)

    def test_enterButton_with_input_admin(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("test_username")
        password = self.driver.find_element_by_name("password")
        password.send_keys("test_password")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin" in self.driver.current_url)

    def test_login_success_admin(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin" in self.driver.current_url)

    def test_logout(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
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

    def test_view_questionnaire_admin(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        view = self.driver.find_element_by_class_name("questionnaire-list-item")
        view.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/standard/75bea290-a6c4-11ea-90b9-4720072c0f8f/view" in self.driver.current_url)

    def test_edit_questionnaire_admin(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        edit = self.driver.find_elements_by_class_name("button")[1]
        edit.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/75bea290-a6c4-11ea-90b9-4720072c0f8f/edit" in self.driver.current_url)


    def test_instructions_edit(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        instructions = self.driver.find_element_by_class_name("sidebar-ssq-instructions")
        instructions.click()
        time.sleep(2)
        item = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        item.click()
        time.sleep(2)
        title = self.driver.find_element_by_class_name("Instruction-title").find_element_by_id("filled-required")
        title.click()
        time.sleep(2)
        content = self.driver.find_element_by_class_name("Instruction-contents").find_element_by_id("filled-required")
        content.click()
        time.sleep(2)
        save = self.driver.find_element_by_id("edit-save-button")
        save.click()
        time.sleep(2)
        assert "Successfully edited!" in self.driver.find_element_by_class_name("center-text").text
        ok = self.driver.find_element_by_class_name("buttons-container").find_element_by_class_name("button")
        ok.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_organisation_item(self):
        admin_login = self.driver.find_element_by_link_text("Admin")
        admin_login.click()
        time.sleep(2)
        username = self.driver.find_element_by_name("username")
        username.send_keys("AdminUser1")
        password = self.driver.find_element_by_name("password")
        password.send_keys("pw1234")
        enter = self.driver.find_element_by_class_name("button")
        enter.click()
        time.sleep(2)
        organisation = self.driver.find_element_by_class_name("sidebar-organisation ")
        organisation.click()
        time.sleep(2)
        item = self.driver.find_elements_by_class_name("organisation-list-item")[0]
        item.click()
        time.sleep(2)
        assert "http://localhost:3000/admin/Organisation/zoo" in self.driver.current_url

    def test_forgetPassword_withoutInput(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("button")
        submit.click()
        time.sleep(2)
        assert "error" in self.driver.find_elements_by_class_name("MuiTypography-root")[1].text

    def test_forgetPassword_withInput(self):
        self.driver.get("http://localhost:3000/findPassword")
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("button")
        submit.click()
        time.sleep(2)
        email = self.driver.find_element_by_class_name("MuiInputBase-input")
        email.send_keys("test_email")
        time.sleep(2)
        assert "Request sent successfully!" in self.driver.find_elements_by_class_name("MuiTypography-root")[1].text
        ok = self.driver.find_element_by_class_name("MuiButtonBase-root")
        ok.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name(" login-box ")

    def tearDown(self):
        self.driver.close()

    if __name__ == '__main__':
        unittest.main()