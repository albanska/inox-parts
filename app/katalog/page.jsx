"use client";

import React from "react";

function page() {
  return (
    <div className="w-full h-screen py-14 flex justify-center items-center">
      <iframe
        allowFullScreen="allowfullscreen"
        scrolling="no"
        className="fp-iframe"
        style={{
          width: "90%",
          height: "90%",
        }}
        src="https://heyzine.com/flip-book/a69150488f.html"
      ></iframe>
    </div>
  );
}

export default page;
