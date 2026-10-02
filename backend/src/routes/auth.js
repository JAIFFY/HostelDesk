import {Router} from 'express'; import * as c from '../controllers/auth.js'; import {auth,roles} from '../middleware/auth.js';
const r=Router();r.post('/register',c.register);r.post('/login',c.login);r.get('/me',auth,c.me);r.post('/logout',auth,c.logout);export default r;
