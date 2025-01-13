import React, { useState,  useContext } from "react";
import ImageResize from "./imageresizer";
import { api } from "../../../Services/api";
import { UserContext } from "../../../Context/UserContext";

function UploadResize() {
  const [imageToResize, setImageToResize] = useState(undefined);
  const [resizedImage, setResizedImage] = useState(undefined);
  const [token] = useContext(UserContext);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageToResize(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", resizedImage);

      api
        .post("/logotipo", formData, {
          headers: { "content-Type": "multipart/form-data",
          Authorization: "Bearer " + token },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            alert("Upload de imagem bem sucedido!");
          } else {
            return new Error("Erro ao importar ficheiro");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Escolha uma imagem</h1>
      <input type="file" accept="image/*" onChange={onUploadFile} />
      <div>
        <ImageResize
          imageToResize={imageToResize}
          onImageResized={(resizedImage) => setResizedImage(resizedImage)}
        />
      </div>
      {resizedImage && (
        <div>
          <h2>Resized Image</h2>
          <img alt="Resize Image" src={resizedImage} />
        </div>
      )}
      <button onClick={handleUpload}>
        Gravar
      </button>
    </div>
  );
}

export default UploadResize;
