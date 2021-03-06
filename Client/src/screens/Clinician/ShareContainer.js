// Import Libraries.
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
    FormLabel, RadioGroup, Radio
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Import Utilities.
import * as API from "../../utils/API";
import { useAuth0 } from "../../utils/react-auth0-spa";
import { HELPER_SORT } from "../../utils/helper";
// Import Components.
import {
    QuestionnaireList,
    Loading
} from "../../components/Commons";

/**
 * =============================================================================
 * REACT COMPONENT
 * =============================================================================
 * @date created: 20th August 2020
 * @authors: Waqas Rehmani, Uvin Abeysinghe
 *
 * This is a Clinician's screen component that displays which questionnaire to
 * share.
 *
 */

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

////////////////////////////////////////////////////////////////////////////////
////                            Define Component                            ////
////////////////////////////////////////////////////////////////////////////////
const ShareQuestionnaire = () => {
    const classes = useStyles();
    const { user, token } = useAuth0();

    const [customisedQuestionnaires, setCustomisedQuestionnaires] = useState(
        []
    );
    const [
        standardisedQuestionnaires,
        setStandardisedQuestionnaires
    ] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isShareModalVisible, setIsShareModalVisible] = useState(false);

    const [isSectionsEmpty, setIsSectionsEmpty] = useState(false);

    const [isShareResultVisible, setIsShareResultVisible] = useState(false);

    const [isShareSuccess, setIsShareSuccess] = useState(false);

    const [shareModalData, setShareModalData] = useState({
        patientEmail: "",
        questionnaireId: "",
        clinicianEmail: user.name,
        message: "",
        readOnly: false,
        sortBy: HELPER_SORT.PERFORMANCE
    });

    const [isSelectedStandard, setIsSelectedStandard] = useState(false);

    const [shareSection, setShareSection] = useState({});

    useEffect(() => {
        setLoading(true);
        const retrieveCustomisedQuestionnaires = async () => {

            const [, customisedQuestionnaires] = await API.getClinicianQuestionnaires(token,
                user.name
            );
            setCustomisedQuestionnaires(customisedQuestionnaires);
            setLoading(false);
        };
        const retrieveStandardisedQuestionnaires = async () => {
            const [statusCode, data] = await API.getStandardisedQuestionnaires();
            if (statusCode === 200) {
                setStandardisedQuestionnaires(data);
            } else {
                console.error(data);
            }
        };
        if (user && token !== "") {
            retrieveStandardisedQuestionnaires();
            retrieveCustomisedQuestionnaires();
        }
    }, [user, token]);

    // Function called when Share is clicked on the QuestionnaireList
    const shareQuestionnaire = (questionnaireId, isStandard, sectionNames) => {
        //making sure the state get reset once the modal is reloaded.
        setIsSectionsEmpty(false);
        setIsSelectedStandard(isStandard)

        let temp = {};
        sectionNames.forEach((s) => {
            temp = { ...temp, [s]: true };
        });

        setShareSection(temp);

        setShareModalData({
            ...shareModalData,
            questionnaireId,
            sectionNames
        });

        openModal();
    };

    // Function called when selection selections are changed
    const sectionSelectionCheck = () => {

        let isEmpty = true;
        Object.entries(shareSection).forEach((k, v) => {
            if (k[1]) {
                isEmpty = false;
            }
        });

        setIsSectionsEmpty(isEmpty);

    };

    // ========================================================================
    // Share result Modal Functions
    // ========================================================================
    const openResultModal = () => setIsShareResultVisible(true);
    const closeResultModal = () => setIsShareResultVisible(false);
    ;

    const renderShareResultModal = () => {
        return (
            <Modal
                open={isShareResultVisible}
                onClose={closeResultModal}
                closeAfterTransition
                className={classes.modal}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={isShareResultVisible && !loading}>
                    <div className="share-modal-container">
                        {isShareSuccess ?
                            <div>
                                <h2 className="center-h2">Shared Successfully!</h2>
                                <p className = "center-p">Please inform your client to check their spams if they cannot find the email.</p>
                            </div>
                            
                            :
                            <h2 className="center-h2">Fail to share, please try
                                again!</h2>
                        }

                        <button className="button"
                                onClick={closeResultModal}
                        >OK
                        </button>
                    </div>
                </Fade>

            </Modal>
        );
    };

    // ========================================================================
    // Share Modal Functions
    // ========================================================================
    const openModal = () => setIsShareModalVisible(true);
    const closeModal = () => setIsShareModalVisible(false);

    const handleShareSubmit = async (e) => {
        e.preventDefault();

        if (!isSectionsEmpty) {
            setLoading(true);
            shareModalData["shareSection"] = shareSection;
            const [statusCode, response] = await API.shareQuestionnaire(token, shareModalData);
            if (statusCode === 200) {
                setLoading(false);
                closeModal();
                setIsShareSuccess(true);
                openResultModal();
            } else {
                console.error(response);
                setIsShareSuccess(false);
                openResultModal();
            }

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
                    timeout: 500
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
                                        patientEmail: e.target.value
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
                                        message: e.target.value
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
                            {isSectionsEmpty ? (
                                <FormLabel component="legend">Pick at least one
                                    section</FormLabel>) : (null)}
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
                                                    shareSection
                                                });
                                                sectionSelectionCheck();
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
                                                readOnly: !shareModalData.readOnly
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

                        <br/>
                        <span>Sort responses by</span>
                        <FormControl color="secondary" margin="dense">
                            <RadioGroup name="frequency"
                                        value={shareModalData.sortBy}
                                        className="slider-checkboxes">
                                <FormControlLabel
                                    value={HELPER_SORT.PERFORMANCE}
                                    control={
                                        <Radio
                                            onChange={() => {
                                                setShareModalData({
                                                    ...shareModalData,
                                                    sortBy: HELPER_SORT.PERFORMANCE
                                                });
                                            }}
                                        />
                                    }
                                    label="Performance"
                                />
                                {isSelectedStandard
                                    ? (
                                        <FormControlLabel
                                            value={HELPER_SORT.IMPORTANCE}
                                            control={
                                                <Radio
                                                    onChange={() => {
                                                        setShareModalData({
                                                            ...shareModalData,
                                                            sortBy: HELPER_SORT.IMPORTANCE
                                                        });
                                                    }}
                                                />
                                            }
                                            label="Importance"
                                        />
                                    ) : null
                                }
                            </RadioGroup>
                        </FormControl>

                        <button className="button">S H A R E</button>
                    </form>
                </Fade>
            </Modal>
        );
    };

    return (
        <div>
            {renderShareResultModal()}
            {renderShareModal()}
            {loading ? <Loading/> : null}

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
