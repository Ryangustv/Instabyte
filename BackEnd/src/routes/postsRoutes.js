import express from "express"
import multer from "multer";
import { listarposts,  novoPost, uploadImg, atualizarNovoPost} from "../controlls/postsController.js"
import cors from "cors";

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ dest: "./uploads", storage });
  
const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listarposts);   
    app.post("/posts", novoPost);
    app.post("/upload", upload.single("imagem"), uploadImg);

    app.put("/upload/:id", atualizarNovoPost)
}
export default routes;
