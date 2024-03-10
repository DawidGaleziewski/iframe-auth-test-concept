import React, { useRef, useEffect, useState } from "react";
export const IframeParent = () => {
  const iFrameRef = useRef(null);
  const [token, setToken] = useState(null);

  // sending data to inframe
  const sendMessage = (data) => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      data,
      "http://localhost:3000"
    );
  };

  // a hacky way to control error handling
  //https://stackoverflow.com/questions/9249680/how-to-check-if-iframe-is-loaded-or-it-has-a-content

  useEffect(() => {
    const handleIFrameParentCommunication = (e) => {
      if(!e?.data?.type) return;
      switch(e.data.type){
        case 'start-fetch': {
          console.log('started fetch from auth url')
          break;
        }
        case 'success': {
          console.log('success fetch of token: ',e.data, e.data.payload)
          setToken(e.data.payload)
          break;
        }
        case 'fail': {
          console.log('crash on fetch')
          break;
        }
      }
    }
    window.addEventListener("message", handleIFrameParentCommunication);

    return () => window.removeEventListener("message", handleIFrameParentCommunication);
  }, []);

  return (
    <div>
      <h1>Parent iFrame</h1>
      <h2>Recived token: {token}</h2>
      <button
        onClick={() => {
          // on click start redirect to desired endpint that will get us token back
          sendMessage({type: 'redirect', payload: 'http://localhost:8080/first-chain-1'});
        }}
      >
        get access token
      </button>

      <br />
      <br />

      <iframe
        ref={iFrameRef}
        src="http://localhost:3000/iframe-child/"
        width="600"
        height="300"
        title="Child iframe"
        // attempt 2 on error handling
        // onError={(e) => {
        //   // handle errors in iframe here
        //   console.log('fetch error occured')
        //   window.parent.postMessage({type: 'fail'}, "http://localhost:3000");
        // }}
                // onError={(e) => {
        //   // handle errors in iframe here
        //   console.log('fetch error occured')
        //   window.parent.postMessage({type: 'fail'}, "http://localhost:3000");
        // }}
      ></iframe>

    </div>
  );
};