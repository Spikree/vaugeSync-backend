import express from 'express'
import dotenv from 'dotenv'
import createAccount from './routes/createAccount.js';
import login from './routes/login.js';
import connectDb from './utils/databaseConnect.js';
import getUserInfo from './routes/getUserInfo.js';
import cors from 'cors'
import changePassword from './routes/changePassword.js';



dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: '*'
}));

const port =  3000;

connectDb();

app.use('/create-account',createAccount);
app.use('/login',login);
app.use('/get-user', getUserInfo);
app.use('/change-password',changePassword);

app.listen(port, () => {
    console.log(`server running from http://localhost:${port}`);
})