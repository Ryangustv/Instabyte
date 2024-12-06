import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";
import { novoPost } from "../controlls/postsController.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getEverythingPosts(){
    const db = conexao.db("projeto-imersao");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function createPost(postNovo){
    const db = conexao.db("projeto-imersao");
    const colecao = db.collection("posts");
    return colecao.insertOne(postNovo);
}

export async function atualizarPost(id, postNovo){
    const db = conexao.db("projeto-imersao");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:postNovo});
}


