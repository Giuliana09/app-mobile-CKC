import axios from "axios";

const api = axios.create({
    // endereço IP do meu pc - lembrar de por o IP da fatec
    baseURL:"http://192.168.10.2:8080"
})

export default api;