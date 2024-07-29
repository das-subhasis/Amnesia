import axios from "axios";

const client = axios.create({
    baseURL: 'https://amnesia-chi.vercel.app/api',
    timeout: 60000,
    timeoutErrorMessage: "RESPONSE TIMEOUT",
})

export default client;