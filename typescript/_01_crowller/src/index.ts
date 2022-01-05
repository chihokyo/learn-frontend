import express, { Request, Response, NextFunction } from 'express';
import router from './router';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.name = 'System';
  next();
});
app.use(router);

app.listen(7001, () => {
  console.log('server is running');
});
