export default async function loginFunc(data) {
    const axios=require('axios');
    console.log("From Login.js: " + data.username);
    console.log("From Login.js: " + data.password);  
    return await axios.post('/api/login', {username: data.username, password: data.password}, 
    {headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }});
    
    // return await new Promise(r => setTimeout(r, 3000)).then(() => {
    //     return {status: 200, data: {company: "Equinix"}};
    // });
}