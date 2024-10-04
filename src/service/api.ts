import axios from "axios";

const api = axios.create({
    //endereço temporario do ngrok, lembrar de gerar e pegar o novo endereço
    baseURL: process.env.MY_IP
    // baseURL:"http://seu-IP:8080"
})

export default api;

