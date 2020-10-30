import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class Sprint3_integration_test(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])
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
        add = self.driver.find_elements_by_class_name("button")[8]
        add.click()
        time.sleep(2)
        delete = self.driver.find_elements_by_class_name("button")[11]
        delete.click()
        time.sleep(2)
        cancel = self.driver.find_elements_by_id("margin-button")[1]
        cancel.click()
        time.sleep(2)
        delete = self.driver.find_elements_by_class_name("button")[11]
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
        edit = self.driver.find_elements_by_class_name("button")[9]
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
        edit = self.driver.find_elements_by_class_name("button")[9]
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
        instruction = self.driver.find_elements_by_class_name("sidebar-button")[0]
        instruction.click()
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[1]
        s2.click()
        time.sleep(2)
        s3 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[2]
        s3.click()
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[1]
        s2.click()
        time.sleep(2)
        s3 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[2]
        s3.click()
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[0]
        s1.click()
        time.sleep(2)
        s2 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[1]
        s2.click()
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[0]
        s1.click()
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[1]
        q.click()
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(3)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
        time.sleep(2)
        next2 = self.driver.find_elements_by_class_name("button")[2]
        next2.click()
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(3)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
        time.sleep(2)
        next = self.driver.find_elements_by_class_name("button")[2]
        next.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(3)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
        time.sleep(2)
        next = self.driver.find_elements_by_class_name("button")[2]
        next.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
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
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(2)
        q = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        q.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960926")
        time.sleep(2)
        ld = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        ld.send_keys("None")
        time.sleep(2)
        rd = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        rd.send_keys("None")
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
        time.sleep(2)
        next1 = self.driver.find_elements_by_class_name("button")[2]
        next1.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
        time.sleep(2)
        review = self.driver.find_elements_by_class_name("button")[2]
        review.click()
        time.sleep(2)
        submit = self.driver.find_elements_by_class_name("button")[2]
        submit.click()
        time.sleep(10)
        goBack=self.driver.find_elements_by_class_name("button")[1]
        goBack.click()
        time.sleep(2)
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
        view = self.driver.find_elements_by_class_name("questionnaire-list-item")[2]
        view.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Questionnaire/standard/1d2a95a0-082e-11eb-a69a-2d6c84ab30fa/view" in self.driver.current_url)

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
        edit = self.driver.find_elements_by_class_name("button")[2]
        edit.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/Questionnaire/standard/28bd25b0-1835-11eb-8455-311c8c9ad5e1/edit" in self.driver.current_url)


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
        instructions = self.driver.find_elements_by_class_name("sidebar-button")[1]
        instructions.click()
        time.sleep(2)
        item = self.driver.find_elements_by_class_name("questionnaire-list-item")[4]
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
        ok = self.driver.find_element_by_class_name("buttons-container").find_element_by_class_name("button")
        ok.click()
        time.sleep(2)
        assert ("http://localhost:3000/admin/SSQ_Instructions" in self.driver.current_url)

    def test_country_item(self):
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
        organisation = self.driver.find_elements_by_class_name("sidebar-button")[2]
        organisation.click()
        time.sleep(2)
        country = self.driver.find_elements_by_class_name("country-list-item")[0]
        country.click()
        time.sleep(2)
        assert "http://localhost:3000/admin/Organisation/AUSTRALIA" in self.driver.current_url

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
        organisation = self.driver.find_elements_by_class_name("sidebar-button")[2]
        organisation.click()
        time.sleep(2)
        country = self.driver.find_elements_by_class_name("country-list-item")[0]
        country.click()
        time.sleep(2)
        item = self.driver.find_elements_by_class_name("organisation-list-item")[0]
        item.click()
        time.sleep(2)
        assert "http://localhost:3000/admin/Organisation/AUSTRALIA/aus" in self.driver.current_url

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