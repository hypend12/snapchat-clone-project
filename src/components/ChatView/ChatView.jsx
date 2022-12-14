import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectSelectedImage } from "../redux/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./ChatView.css";

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    history.replace("/chats");
  };

  return (
    <div className="chatView">
      <img src={selectedImage} onClick={exit} alt=" " />

      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={8}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[10, 5, 2, 0]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              return  exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
