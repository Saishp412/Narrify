"use client";
import { useState } from "react";

export default function DocumentUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      console.log("Selected file:", e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // For now, just log it. Later we can send it to backend
    console.log("Uploading file:", selectedFile.name);
    alert(`File ready to upload: ${selectedFile.name}`);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input type="file" onChange={handleFileChange} />
      <button 
        style={{ marginLeft: "10px", padding: "10px 20px" }} 
        onClick={handleUpload}
      >
        Upload Document
      </button>
      {selectedFile && <p>Selected: {selectedFile.name}</p>}
    </div>
  );
}
