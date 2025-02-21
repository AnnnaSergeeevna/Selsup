import React from "react";
import { createRoot } from "react-dom/client";
import ParamEditor from "./app";

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<ParamEditor />);
}
