import React from "react";
import "./App.css";
import { useState } from "react";

// cloud Name : dx66h7rgb
// API Key : 363246452486153
// key : ml_default

// API base URL : https://api.cloudinary.com/v1_1/dx66h7rgb

// * STEP 1 GET IMAGE
// * STEP 2 PREVIEW IMAGE
// * STEP 3 VALIDASI FILE
// * STEP 4 VALIDASI UKURAN
// * STEP 5 UPLOAD
function App() {
  const [file, setFile] = useState();
  const [prevFile, setPrevFile] = useState();

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    const extend = e.target.files[0].type?.split("/")[1]; // pakai tanda tanya supaya code nya gk break .type?.split("/")[1]
    const size = e.target.files[0].size;
    const allowExtend = ["png", "jpeg", "jpg"];
    // console.log(allowExtend.includes(extend));
    const allowSize = 1024 * 1024; //1 MB

    // VALIDASI FILE
    if (!allowExtend.includes(extend)) {
      alert("File harus jpeg atau png");
    } else if (allowSize < size) {
      alert(`Ukuran file terlalu besar, maksimal 1MB `);
    } else {
      setFile(e.target.files[0]); //get image
      setPrevFile(URL.createObjectURL(e.target.files[0])); //Convert Object to url
    }
  };

  const handleSubmit = async () => {
    const api = "https://api.cloudinary.com/v1_1/dx66h7rgb/image/upload";
    const key = "ml_default";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    const res = await fetch(api, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input type="file" onChange={handleImage} />
      <img src={prevFile} alt="" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
