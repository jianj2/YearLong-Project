import unittest
from selenium import webdriver
from configparser import ConfigParser
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time


class unittest_frontend_patientPage(unittest.TestCase):

    def setUp(self):
        config_object = ConfigParser()
        config_object.read("../driverConfig.ini")
        self.driver = webdriver.Chrome(config_object["DRIVERLOCATION"]["Driver"])

        self.driver.get("http://localhost:3000/participant/9e3cf510-1982-11eb-93f6-f18b956c23f1")
        time.sleep(3)

    def test_next_page1(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_instructions_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        instruction =self.driver.find_elements_by_class_name("button")[0]
        instruction.click()
        time.sleep(2)
        assert "I N S T R U C T I O N S" in self.driver.find_element_by_class_name(
            "parents-container").find_element_by_tag_name("h1").text

    def test_fillin_name_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("Daniel")
        time.sleep(2)

    def test_fillin_birth_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        birth.send_keys("19960829")
        time.sleep(2)


    def test_fillin_LDevice_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        LDevice = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        LDevice.send_keys("None")
        time.sleep(2)

    def test_fillin_RDevice_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        RDevice = self.driver.find_elements_by_class_name("MuiInputBase-input")[4]
        RDevice.send_keys("None")
        time.sleep(2)

    def test_fillin_completeBy_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        completeBy = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        completeBy.send_keys("tester")
        time.sleep(2)

    def test_fillin_relation_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        relation = self.driver.find_elements_by_class_name("MuiInputBase-input")[5]
        relation.send_keys("Mother")
        time.sleep(2)

    def test_next_withoutInput_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_next_withWrongInput_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
        time.sleep(2)
        name = self.driver.find_elements_by_class_name("MuiInputBase-input")[0]
        name.send_keys("TestName")
        time.sleep(2)
        birth = self.driver.find_elements_by_class_name("MuiInputBase-input")[2]
        birth.send_keys("aabbccdd")
        time.sleep(2)
        LDevice = self.driver.find_elements_by_class_name("MuiInputBase-input")[1]
        LDevice.send_keys("None")
        time.sleep(2)
        RDevice = self.driver.find_elements_by_class_name("MuiInputBase-input")[3]
        RDevice.send_keys("None")
        time.sleep(2)
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_next_withCorrectInput_page2(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("questionaire-container")

    def test_select_slider_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        slider = self.driver.find_elements_by_class_name("MuiSlider-thumb")[0]
        slider.click()
        time.sleep(2)

    def test_select_answerForMcq_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        box = self.driver.find_elements_by_class_name("MuiFormControlLabel-root")[3]
        box.click()
        time.sleep(2)

    def test_instruction_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        instruction = self.driver.find_element_by_class_name("subheader-container").find_elements_by_class_name("button")[0]
        instruction.click()
        time.sleep(2)
        assert "I N S T R U C T I O N S" in self.driver.find_element_by_class_name(
            "parents-container").find_element_by_tag_name("h1").text

    def test_back_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        back = self.driver.find_element_by_class_name("subheader-container").find_elements_by_class_name("button")[1]
        back.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("parents-detail-form")

    def test_review_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("dothetest-container")

    def test_review_answered_page3(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("review-submission")

    def test_instruction_page4(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)
        instruction = self.driver.find_element_by_class_name("subheader-container").find_elements_by_class_name(
            "button")[0]
        instruction.click()
        time.sleep(2)
        assert "I N S T R U C T I O N S" in self.driver.find_element_by_class_name(
            "parents-container").find_element_by_tag_name("h1").text

    def test_back_page4(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)
        back = self.driver.find_element_by_class_name("subheader-container").find_elements_by_class_name(
            "button")[1]
        back.click()
        time.sleep(2)
        assert self.driver.find_element_by_class_name("questionaire-container")

    def test_submit_page4(self):
        next1 = self.driver.find_element_by_class_name("button")
        next1.click()
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
        next2 = self.driver.find_elements_by_class_name("button")[1]
        next2.click()
        time.sleep(2)
        notHear = self.driver.find_elements_by_class_name("MuiIconButton-label")[0]
        notHear.click()
        time.sleep(2)
        review = self.driver.find_element_by_id("review")
        review.click()
        time.sleep(2)
        submit = self.driver.find_element_by_class_name("subheader-container").find_elements_by_class_name(
            "button")[2]
        submit.click()
        time.sleep(10)
        assert "Response Sent" in self.driver.find_element_by_class_name("form-completed").find_element_by_tag_name(
            "h1").text
    
    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main()
