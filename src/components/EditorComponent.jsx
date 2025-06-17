import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";

const EditorComponent = ({ existingContent }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: existingContent || "<p>Hello World!</p>",
  });
  //  save content
  const handleSave = async () => {
    const htmlContent = editor.getHTML();
    await axios.post("http://localhost:9000/content/postcontent", {
      content: htmlContent,
    });
  };

  return (
    <div className="w-screen bg-slate-600">
      <EditorContent className="w-full" editor={editor} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditorComponent;
