import React, { useEffect, useState } from "react";
export const IframeChild = () => {
  const [recievedMessage, setRecievedMessage] = useState("");

  // const sendMessage = () => {
  //   window.parent.postMessage("Hi dad!", "http://localhost:3000");
  // };

  useEffect(() => {
    // when loading first time listener function is set. We want to recognize if we already have recived the token or not
    // const currentIframeUrl = window.location.href;

    // we want to know if we already have the required params or not:
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');
  
    console.log('myParam', myParam, window.location);

    // setup logic for communicating with main app
    window.addEventListener("message", function (e) {
      // if (e.origin !== "http://localhost:3000") return;
      // handle all incoming msgs here
      // setRecievedMessage("Got this message from parent: " + e.data);
      console.log('recived in iframe',  e.data)

      if(!e.data) return;

      switch(e.data.type){
        case 'redirect': {
          window.location.href = e.data.payload
        }
      }
    });
  
  }, []);

  return (
    <div>
      <h2>Child iFrame</h2>
      {/* <button onClick={sendMessage}>Send message to parent</button> */}
      <p>{recievedMessage}</p>
    </div>
  );
};