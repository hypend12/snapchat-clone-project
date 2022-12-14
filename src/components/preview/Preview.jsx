import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "../redux/cameraSlice";
import CloseIcon from "@material-ui/icons/Close";
import "./Preview.css";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import { db, storage } from "../firebase/Firebase";
import { selectUser } from "../redux/appSlice";


export const Preview = () => {
  const CameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
 const user = useSelector(selectUser);


  useEffect(() => {
    if (!CameraImage) {
      history.replace("/");
    }
  }, [CameraImage, history]);

  const closePreView = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`)
      .putString(CameraImage, "data_url");

    uploadTask.on("state_changed",
      null,
      (error) => {
        // error function
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: "Dawayne wayne",
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
            console.log(sendPost)
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseIcon onClick={closePreView} className="preview__close" />

      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>

      <img src={CameraImage} alt="" />

      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
