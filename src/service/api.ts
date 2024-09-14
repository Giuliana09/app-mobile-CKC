import axios from "axios";

const api = axios.create({
    //endereço temporario do ngrok, lembrar de gerar e pegar o novo endereço
    baseURL:"https://975a-2804-431-c7f4-c8f2-b82e-629a-d69b-c57.ngrok-free.app"
    // baseURL:"http://seu-IP:8080"
    
  
})

export default api;

