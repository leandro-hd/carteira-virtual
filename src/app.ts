import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';
import nunjucks from 'nunjucks';
import './database/index';

const app = express();

nunjucks.configure('src/views/pages', {
  express: app,
  noCache: true,
})

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

export { app };