import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {io} from  'socket.io-client';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

function TextEditor() {
  const [socket, setSocket] = useState()

  const [quill, setQuill] = useState()
useEffect(() => {
  const socket = io("http://localhost:3001")

  return () => {
    socket.disconnect()
  }
}, [])

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");

    wrapper.append(editor);

    new Quill(editor, { theme: "snow", modules:{toolbar: TOOLBAR_OPTIONS} });
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
}

export default TextEditor;
