import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_clinicianHomePage(unittest.TestCase):

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
        time.sleep(5)

    def test_questionnaire_tab(self):
        questionnaire = self.driver.find_elements_by_class_name("sidebar-button")[3]
        questionnaire.click()
        time.sleep(2)
        assert ("http://localhost:3000/clinician/Questionnaires" in self.driver.current_url)

    def test_doTheTest_tab(self):
        test = self.driver.find_elements_by_class_name("sidebar-button")[1]
        test.click()
        time.sleep(2)
        assert ("http://localhost:3000/clinician/DoTheTest" in self.driver.current_url)

    def test_share_tab(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        assert ("http://localhost:3000/clinician/Share" in self.driver.current_url)

    def test_instructions_tab(self):
        instruction = self.driver.find_elements_by_class_name("sidebar-button")[0]
        instruction.click()
        time.sleep(2)
        assert ("http://localhost:3000/clinician/Instructions" in self.driver.current_url)

    def test_addNew(self):
        add = self.driver.find_element_by_class_name("CQ-header").find_element_by_class_name("button")
        add.click()
        time.sleep(2)

    def test_editQuestionnaire_cancel(self):
        edit = self.driver.find_elements_by_class_name("button")[10]
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

    def test_editQuestionnaire_save(self):
        edit = self.driver.find_elements_by_class_name("button")[10]
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

    def test_editQuestionnaire(self):
        edit = self.driver.find_elements_by_class_name("button")[10]
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
        rang = self.driver.find_elements_by_class_name("questionTable-button-selected")[2]
        rang.click()
        time.sleep(2)
        # mul = self.driver.find_elements_by_link_text("Multiple Choice Question")[2]
        # mul.click()
        # time.sleep(2)
        remove = self.driver.find_elements_by_id("questionTable-remove-button")[2]
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

    def test_editQuestionnaire_delete(self):
        delete = self.driver.find_elements_by_class_name("button")[8]
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

    def test_view_first_questionnaire(self):
        view = self.driver.find_elements_by_class_name("questionnaire-list-item")[0]
        view.click()
        time.sleep(2)

    def test_complete_enterPersonalDetails(self):
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

    def test_complete_enterPersonalDetails_wrongBirth(self):
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
        birth.send_keys("aabbccdd")
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
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_complete_nextWithoutInput(self):
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
        assert self.driver.find_element_by_class_name("dothetest-container")

    def test_complete_backOnPage2(self):
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
        assert "http://localhost:3000/clinician/DoTheTest" in self.driver.current_url

    def test_clickShare(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        assert self.driver.find_elements_by_class_name("share-modal-container")

    def test_selectEmail_share(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)

    def test_selectMessage_share(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        message = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        message.send_keys("Please note this questionnaire can only be done once!")
        time.sleep(2)

    def test_selectSections_share(self):
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

    def test_selectReadonly_share(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        readOnly = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[3]
        readOnly.click()
        time.sleep(2)

    def test_share_noSection(self):
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
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)

    def test_share_oneSection(self):
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
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
        assert "http://localhost:3000/clinician/Share" in self.driver.current_url

    def test_share_twoSection(self):
        share = self.driver.find_elements_by_class_name("sidebar-button")[2]
        share.click()
        time.sleep(2)
        shareB = self.driver.find_elements_by_class_name("button")[2]
        shareB.click()
        time.sleep(2)
        s1 = self.driver.find_elements_by_class_name("PrivateSwitchBase-input-86")[0]
        s1.click()
        time.sleep(2)
        email = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        email.send_keys("test@gmail.com")
        time.sleep(2)
        button = self.driver.find_element_by_class_name("MuiFormControl-root").find_element_by_class_name("button")
        button.click()
        time.sleep(10)
        assert "http://localhost:3000/clinician/Share" in self.driver.current_url

    def test_share_allSection(self):
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

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
