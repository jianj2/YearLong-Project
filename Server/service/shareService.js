////////////////////////////////////////////////////////////////////////////////
////                             Import Modules                             ////
////////////////////////////////////////////////////////////////////////////////
const mongoose = require("mongoose");
const Share = mongoose.model("share");
const { v1: uuidv1 } = require("uuid");

/**
 * =============================================================================
 * DEFINING QUESTIONNAIRE SERVICE
 * =============================================================================
 * @date created: 5 Oct 2020
 * @authors: Cary Jin
 *
 * The share service handles the domain and datasource
 * logic related to processing shared questionnaires.
 *
 */

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to delete a share
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const deleteShare = async (shareId) => {
    try {
        await Share.deleteOne({ shareId: shareId });
        return undefined;
    } catch (error) {
        return error;
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to find a share by id.
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

const findShareById = async (shareId) => {
    try {
        const share = await Share.findOne({ shareId });
        return Promise.resolve([undefined, share]);
    } catch (error) {
        return Promise.resolve([error, undefined]);
    }
};

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to create a share
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const createShare =  (packet) => {
    let visibleSection = [];
    Object.entries(packet.shareSection).map((k, v) => {
        visibleSection.push({ title: k[0], isVisible: k[1] });
    });

    const uuid = uuidv1();
    let newShare = new Share({
        shareId: uuid,
        clinicianEmail: packet.clinicianEmail,
        patientEmail: packet.patientEmail,
        questionnaireId: packet.questionnaireId,
        readOnly: packet.readOnly,
        message: packet.message,
        shareSection: visibleSection,
        sortBy: packet.sortBy,
    });
    return newShare;
}

// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
// This function is used to save a share
// ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
const saveShare = async (share) => {
    try {
        await share.save();
        return undefined;
    } catch (error) {
        return error;
    }
}

////////////////////////////////////////////////////////////////////////////////
////                             Export Modules                             ////
////////////////////////////////////////////////////////////////////////////////
module.exports = {
    createShare,
    deleteShare,
    saveShare,
    findShareById,
}