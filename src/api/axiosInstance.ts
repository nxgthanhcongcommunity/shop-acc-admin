import axios from "axios";
const { REACT_APP_API_URL, REACT_APP_API_VER } = process.env

const instance = axios.create({
    baseURL: `${REACT_APP_API_URL}/api/${REACT_APP_API_VER}`,
    timeout: 20000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;