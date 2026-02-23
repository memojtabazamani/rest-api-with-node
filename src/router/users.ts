import express from 'express';

import {getAllUsers} from "../cotnrollers/users";
import {getUserBySessionToken} from "../db/users";

export default (router: express.Router) => {
    router.get('/users',  getAllUsers);
}