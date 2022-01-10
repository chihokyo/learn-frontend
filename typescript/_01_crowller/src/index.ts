import express, { Request, Response, NextFunction } from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: 'session',
    keys: ['chin'],
    // 登录期限 24小时
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});
