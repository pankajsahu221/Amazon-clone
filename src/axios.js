import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-bd001.cloudfunctions.net/api' 
    // baseURL: 'http://localhost:5001/clone-bd001/us-central1/api' //the API (cloud function) url 
})

export default instance;
    
    