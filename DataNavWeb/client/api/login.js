export default async function loginFunc(data) {
    const username = data.username;
    console.log("From Login.js: " + data.username);
    console.log("From Login.js: " + data.password);
    return await axios.post('/api/login', {username: username, password: password}); //TODO: uncomment this line when backend is ready
    // return await new Promise(r => setTimeout(r, 3000)).then(() => {
    //     return {status: 200, data: {company: "Equinix"}};
    // });
}