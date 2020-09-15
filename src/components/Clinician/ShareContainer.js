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
    FormLabel,
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
    const { user, token } = useAuth0();
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

    const [isSectionsEmpty, setIsSectionsEmpty] = useState(false);


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
           
            const [statusCode, customisedQuestionnaires] = await API.getClinicianQuestionnaires(token,
                user.name
            );
            const today = formatDate();
            setCustomisedQuestionnaires(customisedQuestionnaires);
            setLoading(false);
        }
        async function retrieveStandardisedQuestionnaires() {
            const [statusCode, data] = await API.getStandardisedQuestionnaires();
            if (statusCode === 200) {
                setStandardisedQuestionnaires(data);
            }else{
                console.error(data);
            }
        }
        if(user && token !== ""){
            retrieveStandardisedQuestionnaires();
            retrieveCustomisedQuestionnaires();
        }
    }, [user, token]);

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireId, sections) => {
        console.log("share Questionnaire ", questionnaireId);

        //making sure the state get reset once the modal is reloaded.
        setIsSectionsEmpty(false);

        var temp = {};
        sections.map((index) => {
            temp = { ...temp, [index.title.toString()]: true };
        });

        setShareSection(temp);

        setShareModalData({
            ...shareModalData,
            questionnaireId,
            shareSection,
        });

        openModal();
    };

    // Function called when selection selections are changed
    const sectionSelectionCheck = () => {

        let isEmpty = true;
        Object.entries(shareSection).map((k, v) => {
            if(k[1]){
                isEmpty = false;
            }
        })

        setIsSectionsEmpty(isEmpty);

    };

    // ========================================================================
    // Share Modal Functions
    // ========================================================================
    const openModal = () => setIsShareModalVisible(true);
    const closeModal = () => setIsShareModalVisible(false);

    const handleShareSubmit = (e) => {
        e.preventDefault();

        if( !isSectionsEmpty ){
            setLoading(true);
            shareModalData["shareSection"] = shareSection;
            API.shareQuestionnaire(token, shareModalData).then( res => {
                setLoading(false);
                closeModal();
            });
        }
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
                <Fade in={isShareModalVisible && !loading}>
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
                                Please enter recipient's email.
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
                                want to send to the recipient (optional).
                            </FormHelperText>
                        </FormControl>

                        {/* list of all the sections with check boxes*/}
                        <FormControl error={isSectionsEmpty}
                            margin="dense"
                            style={{ border: "1px groove #56577d" }}
                        >
                            {isSectionsEmpty?(<FormLabel component="legend">Pick at least one section</FormLabel>):(null)}
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
                                                }); sectionSelectionCheck();
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
                                label="Allow recipient to complete the questionnaire"
                            />
                            <FormHelperText>
                                If this option is checked, the recipient can
                                complete the questionnaire. The
                                report will be sent to you.
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
                <h1>My Customised Questionnaires</h1>
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
