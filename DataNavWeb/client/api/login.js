export default async function loginFunc(data) {
    require('dotenv').config();
    const baseURL = process.env.BASE_URL;
    const axios = require('axios');
    const axiosInstance = axios.create({
        baseURL: baseURL
    });
    return await axiosInstance.post('/api/login', {username: data.username, password: data.password}, 
    {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }}).catch((error) => {
        return {status: error.response.status, data: error.response.data};
    });
    
    // return await new Promise(r => setTimeout(r, 3000)).then(() => {
    //     return {status: 200, data: {company: "Equinix"}};
    // });
}