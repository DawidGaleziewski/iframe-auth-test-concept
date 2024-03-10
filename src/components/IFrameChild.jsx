import React, { useEffect, useState } from "react";
export const IframeChild = () => {
  const sendMessage = (data) => {
    window.parent.postMessage(data, "http://localhost:3000");
  };

  useEffect(() => {
    const handleIframeChildCommunication = (e) => {
      if(!e.data || !e.data.type) return;
      switch(e.data.type){
        case 'redirect': {
          // start redirect when reciving msg from spa
          try {
            sendMessage({type: 'start-fetch'})
            window.location.href = e.data.payload;
          } catch(e){
            sendMessage({type: 'fail'})
          }
          break
        }
      }
    }
    // when loading first time listener function is set. We want to recognize if we already have recived the token or not
    // const currentIframeUrl = window.location.href;

    // we want to know if we already have the required params or not:
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');

    if(myParam){
      console.log('success on reciving token', myParam)
      sendMessage({type: 'success', payload: myParam})
    }
    // attempt 1 on error handling
    // window.addEventListener('error', (e) => {
    //   sendMessage({type: 'fail'})
    // })
    // setup logic for communicating with main app
    window.addEventListener("message", handleIframeChildCommunication);
    return () => window.removeEventListener("message", handleIframeChildCommunication)
  }, []);

  return (
    <div>
      <h2>Child iFrame</h2>
    </div>
  );
};