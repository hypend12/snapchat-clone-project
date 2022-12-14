import React, { useEffect } from "react";
import WebcamCapture from "./components/webcam/WebcamCapture";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from "./components/preview/Preview";
import Chats from "./components/Chats/Chats";
import ChatView from "./components/ChatView/ChatView";
import { login, logout, selectUser } from "./components/redux/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/login/Login";
import { auth } from "./components/firebase/Firebase";


function App() {
const user = useSelector(selectUser);
const dispatch = useDispatch();

useEffect(() => {
   auth.onAuthStateChanged((authUser) => {
if (authUser) {
  dispatch(login({
    username: authUser.user.displayName,
        profilePic: authUser.user.photoURL,
        id: authUser.user.uid,
  }))
} else {
  dispatch(logout())
}
   } )
})

  return (
    <div className="App">
    <Router>
   {!user ? (
    <Login />
   ): (
    <> 
    <img className="app__logo"
     src="data:image/png;base64,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"  alt="" 
    />
    <div className="app__body">

<div className="app__bodybackground" >


<Switch>
    <Route path="/chats/view" > 
    <ChatView />
    </Route>

    <Route path="/chats" > 
    <Chats />
    </Route>

         <Route path="/preview" > 
    <Preview />
    </Route>

      <Route exact path="/" >

      <WebcamCapture />
      </Route>

      
        
      </Switch>
</div>

  </div>
  </>
   )}
  
      </Router>
    </div>
  );
}

export default App;