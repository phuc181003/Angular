import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { readdirSync } from 'fs';
require('dotenv').config();
const colorize = (...args) => ({
    black: `\x1b[30m${args.join(' ')}`,
    red: `\x1b[31m${args.join(' ')}`,
    green: `\x1b[32m${args.join(' ')}`,
    yellow: `\x1b[33m${args.join(' ')}`,
    blue: `\x1b[34m${args.join(' ')}`,
    magenta: `\x1b[35m${args.join(' ')}`,
    cyan: `\x1b[36m${args.join(' ')}`,
    white: `\x1b[37m${args.join(' ')}`,
    bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
    bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
    bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
    bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
  })
// Router


const app = express();
mongoose.connect(process.env.DATABASE)
    .then(() =>  console.log(colorize('Database Kết Nối Thành Công' ).bgRed))
    .catch(error => console.log('DB not connected ', error))

// middleware
app.use(morgan("tiny"));
app.use(express.json())
app.use(cors()) 


// Route
readdirSync('./src/routes').map(route => app.use("/api", require(`./src/routes/${route}`)))

const port = process.env.PORT ;

app.listen(port, () => {
    console.log(colorize('SERVER ĐANG CHẠY TẠI : http://localhost:2910').bgWhite);
    console.log(colorize('Source By HungDeveloper - Do Not Copyright' ).bgCyan);
    console.log(colorize('Thắc mắc liên hệ FB : https://www.facebook.com/Benzdapoetvip' ).bgMagenta);
  });
  