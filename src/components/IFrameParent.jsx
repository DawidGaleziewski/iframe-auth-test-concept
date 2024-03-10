import React, { useRef, useEffect, useState } from "react";
export const IframeParent = () => {
    console.log('#iframe start')
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState("");

  // sending data to inframe
  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      "Hello son!",
      "http://localhost:3000"
    );
  };

  // listening for data from iframe
  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setRecievedMessage("Got this message from child: " + e.data);
    });
  }, []);

  return (
    <div>
      <h1>Parent iFrame</h1>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send message to child
      </button>

      <br />
      <br />

      <iframe
        ref={iFrameRef}
        src="http://localhost:8080/first-chain-1"
        width="600"
        height="300"
        title="Child iframe"
      ></iframe>

      <p>{recievedMessage}</p>
    </div>
  );
};