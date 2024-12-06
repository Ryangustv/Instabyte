import { url } from "inspector";
import {getEverythingPosts, createPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"
export async function listarposts(req, res) {
    const posts = await getEverythingPosts();
    res.status(200).json(posts); 
}

export async function novoPost(req, res){
    const postnovo = req.body;
    try{
        const postCriado = await createPost(postnovo);
        res.status(200).json(postCriado); 
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImg(req, res){
    const postnovo = {
        decricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
        const postCriado = await createPost(postnovo);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado); 
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`
    try{
        const imgBuffer =  fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt : req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado); 
    } catch (erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}
