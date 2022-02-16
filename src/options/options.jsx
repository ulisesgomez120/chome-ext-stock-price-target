import React from "react";
import ReactDom from "react-dom";

const Hello = () => {
  return (
    <>
      <h1>Coming Soon!</h1>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDom.render(<Hello />, root);
