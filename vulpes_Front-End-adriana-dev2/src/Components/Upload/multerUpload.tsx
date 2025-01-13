import React, { ChangeEvent, Component, useState } from "react";
import express from "express";
import multer from "multer";

const uploadimg = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images");
    },
    // garantir que o ficheiro não tem nomes duplicados. Assim, ficam guardados pela data e hora
    filename: (req, file, callback) => {
      const time = new Date().getDate();

      // Concate uma string
      callback(null, `${time}_${file.originalname}`);
    },
  }),

  fileFilter: (req, file, callback) => {
    const extensaoImg = ["image/png", "image/jpg", "image/jpeg"].find(
      (formatoAceite) => formatoAceite === file.mimetype
    );

    if (extensaoImg?.includes(file.mimetype)) {
      return callback(null, true);
    }

    return callback(null, false);
  },
});

// multer faz um parse do arquivo

const app = express();

// single porque so recebe um arquivo
app.post("/logotipo", uploadimg.single("image/*"), (req, res) => {
  if (req.file) {
    return res.json({
      erro: false,
      messagem: "Upload realizado!",
    });
  }

  return res.status(400).json({
    erro: true,
    mensagem: "Erro: Upload não concluido!",
  });
});

app.listen(8080);

// // single porque so recebe um arquivo
// app.post("/logotipo", uploadimg.single("image"), async (req, res) => {
//   try {
//     // 'file' is the name of our file input field in the HTML form
//     let upload = multer({ storage: storage }).single("file");
//     upload(req, res, function (err) {
//       if (!req.file) {
//         return res.send("Please select an image to upload");
//       } else if (err instanceof multer.MulterError) {
//         return res.send(err);
//       } else if (err) {
//         return res.send(err);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.listen(8080);


