import React, { useState, useEffect } from "react";
import {
    Modal,
    Backdrop,
    Fade,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    FormControlLabel,
    Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Import Utils.
import * as API from "../../utils/api";
import { formatDate } from "../../utils/formatter";
import { useAuth0 } from "../../utils/react-auth0-spa";
// Import styles.
import "../../styles/managequestionnaires.css";
import "../../styles/main.css";
// Import Components.
import QuestionnaireList from "../QuestionnaireList";
import Loading from "../Loading";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const ShareQuestionnaire = (props) => {
    const classes = useStyles();
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    // console.log("user.name", user.name); //TODO: change that when we have actual clincianId

    const [customisedQuestionnaires, setCustomisedQuestionnaires] = useState(
        []
    );
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires,
    ] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const [shareModalData, setShareModalData] = useState({
        patientEmail: "",
        questionnaireId: "",
        clinicianEmail: user.name,
        message: "",
        readOnly: false,
    });

    const [shareSection, setShareSection] = useState({});

    useEffect(() => {
        setLoading(true);
        async function retrieveCustomisedQuestionnaires() {
            const customisedQuestionnaires = await API.getClinicianQuestionnaires(
                user.name
            );
            const today = formatDate();
            const customisedQuestionnairesElement = customisedQuestionnaires.map(
                (q) => {
                    return {
                        QID: q.questionnaireId,
                        Qname: q.title,
                        Qdescription: q.description,
                        date: today,
                    };
                }
            );
            // setQuestionnaires({ customized_Questionnaire: customisedQuestionnairesElement });
            setCustomisedQuestionnaires(customisedQuestionnaires);
            setLoading(false);
        }
        async function retrieveStandardisedQuestionnaires() {
            const response = await API.getStandardisedQuestionnaires();
            if (response.statusCode === 200) {
                setStandardisedQuestionnaires(response.data);
            }
        }
        retrieveStandardisedQuestionnaires();
        retrieveCustomisedQuestionnaires();
    }, [user]);

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireId, sections) => {
        console.log("share Questionnaire ", questionnaireId);

        var temp = {};
        sections.map((index) => {
            temp = { ...temp, [index.title.toString()]: false };
        });

        setShareSection(temp);

        setShareModalData({
            ...shareModalData,
            questionnaireId,
            shareSection,
        });

        openModal();
    };

    // ========================================================================
    // Share Modal Functions
    // ========================================================================
    const openModal = () => setIsShareModalVisible(true);
    const closeModal = () => setIsShareModalVisible(false);

    const handleShareSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        //share section is {section:isVisible}
        setShareModalData({
            ...shareModalData,
            shareSection,
        });

        API.shareQuestionnaire(shareModalData).then( res => {
            setLoading(false);
            closeModal();
        });
    };

    const renderShareModal = () => {
        return (
            <Modal
                open={isShareModalVisible}
                onClose={closeModal}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isShareModalVisible}>
                    <form
                        className="share-modal-container"
                        onSubmit={handleShareSubmit}
                    >
                        <h2>Share Details</h2>
                        <FormControl margin="dense">
                            <InputLabel>Email</InputLabel>
                            <Input
                                onChange={(e) => {
                                    setShareModalData({
                                        ...shareModalData,
                                        patientEmail: e.target.value,
                                    });
                                }}
                                name="patientEmail"
                                type="email"
                                required
                            />
                            <FormHelperText>
                                Please enter patient's email.
                            </FormHelperText>
                        </FormControl>

                        <FormControl margin="dense">
                            <InputLabel>Personalised Message</InputLabel>
                            <Input
                                onChange={(e) => {
                                    setShareModalData({
                                        ...shareModalData,
                                        message: e.target.value,
                                    });
                                }}
                                multiline
                                name="message"
                                type="text"
                            />
                            <FormHelperText>
                                Please enter a personalised Message that you
                                want to send to the patient (optional).
                            </FormHelperText>
                        </FormControl>

                        {/* list of all the sections with check boxes*/}
                        <FormControl
                            margin="dense"
                            style={{ border: "1px inset #56577d" }}
                        >
                            {Object.entries(shareSection).map((k, v) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={k[1]}
                                            onChange={(e) => {
                                                shareSection[k[0]] =
                                                    e.target.checked;
                                                setShareModalData({
                                                    ...shareModalData,
                                                    shareSection,
                                                });
                                            }}
                                            name="section selection"
                                        />
                                    }
                                    label={k[0]}
                                />
                            ))}

                            <FormHelperText>
                                Please select the sections you want to share.
                            </FormHelperText>
                        </FormControl>

                        <FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!shareModalData.readOnly}
                                        onChange={() => {
                                            setShareModalData({
                                                ...shareModalData,
                                                readOnly: !shareModalData.readOnly,
                                            });
                                        }}
                                    />
                                }
                                label="Allow parent to complete the questionnaire"
                            />
                            <FormHelperText>
                                If this option is checked, patients can
                                independently complete the questionnaire and the
                                report would be sent to you.
                            </FormHelperText>
                        </FormControl>
                        <button className="button">S H A R E</button>
                    </form>
                </Fade>
            </Modal>
        );
    };

    return (
        <div>
            {renderShareModal()}
            {loading ? <Loading /> : null}

            <div className="standard-questionnaire-container">
                <div className="SQ-header">
                    <h1>Standard Questionnaires</h1>
                </div>
                <QuestionnaireList
                    questionnaires={standardisedQuestionnaires}
                    listTitle={""}
                    canShare={true}
                    onClickShare={shareQuestionnaire}
                />
            </div>

            <div className="CQ-header">
                <h1>My Questionnaires</h1>
            </div>

            <QuestionnaireList
                questionnaires={customisedQuestionnaires}
                listTitle={""}
                canShare={true}
                onClickShare={shareQuestionnaire}
            />
        </div>
    );
};

export default ShareQuestionnaire;