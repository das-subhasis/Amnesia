import { Router } from "express";
import { login, register } from "../controller/authController";

const auth = Router()

auth.get('/', (req, res) => {res.send('hello')})
auth.post('/login', login);
auth.post('/register', register);

export default auth