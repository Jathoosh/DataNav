export default async function codeGenerator(data) {
    const axios = require('axios');
    return await axios.post('/api/codeGenerator', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}