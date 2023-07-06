export default async function codeGenerator(data) {
    const baseURL = process.env.BASE_URL;
    const axios = require('axios');
    const axiosInstance = axios.create({
        baseURL: baseURL
    });
    return await axiosInstance.post('/api/codeGenerator', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).catch((error) => {
        return { status: error.response.status, data: error.response.data };
    });
}