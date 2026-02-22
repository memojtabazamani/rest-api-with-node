import express from "express";

import { register } from '../cotnrollers/authentication';

export default (
    router: express.Router,
)=> {
    router.post('/auth/register', register);
};