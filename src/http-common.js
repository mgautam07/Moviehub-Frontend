import axios from "axios"
import dotenv from "dotenv"

dotenv.config()
export default axios.create({
    baseURL : process.env.backend || "http://localhost:3000",
    headers : {
        "Content-type" : "application/json",
        "crossDomain" : true
    }
});