import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["link"],
    ["clean"],
  ],
};

const formats = ["bold", "italic", "underline", "strike", "link", "header"];

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: string) => void;
};

const TextEditor = ({ value, placeholder, onChange }: Props) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export { TextEditor };
