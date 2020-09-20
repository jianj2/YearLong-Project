
import React, { useState, useEffect } from "react"; 
import { Modal, Backdrop, Fade} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const CustomModal = (props) => {
    
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        setIsVisible(props.isModalVisible);
       
    },[props]);

       return (
           <Modal
               open={isVisible}
               onClose={()=>{props.setIsModalVisible(false)} }
               closeAfterTransition
               className={classes.modal}
               BackdropComponent={Backdrop}
               BackdropProps={{
                   timeout: 500,
               }}
           >
               <Fade in={isVisible}>
                   <div className="share-modal-container">
                       <h3 className="center-text">
                            {props.message}
                       </h3>
                       <div className="buttons-container">
                           <button
                               className="button"
                               id="margin-button"
                               onClick={()=>{
                                   props.onClickConfirm();
                                   props.setIsModalVisible(false);
                                }}
                           >
                               CONFIRM
                           </button>
                           <button
                               className="button"
                               id="margin-button"
                               onClick={
                                   
                                   ()=>{
                                        props.onClickCancel();
                                       props.setIsModalVisible(false);
                                    }
                               }
                           >
                               CANCEL
                           </button>
                       </div>
                   </div>
               </Fade>
           </Modal>
       );

  }

 
 

export default CustomModal;