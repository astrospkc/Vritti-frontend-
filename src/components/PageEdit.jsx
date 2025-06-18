import { useEffect, useState } from "react";
import axios from "axios";
import EditorComponent from "./EditorComponent";

const PageEdit = () => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/content/getcontent"
        );
        setContent(response.data?.content);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchContent();
  }, []);
  return (
    <div className="w-full m-10 h-screen">
      <h1>Rich text editor</h1>
      <EditorComponent className="" existingContent={content} />
    </div>
  );
};

export default PageEdit;
