// Import readline module for getting input from console
// Find more here: https://nodejs.org/api/readline.html#readline_readline
// import readline from 'readline';
// import _ from 'lodash';
import express from 'express';
import logger from './utilities/logger';
import scaler from './utilities/imagerescaler';

const app = express();
const port = 8080;

app.use('/assets/full', express.static('assets/full'));

app.use('/assets/full', express.static('assets/thumb'));


app.get('/api/images', scaler, async (req, res): Promise<any> => {
  //Everything is handled in the middleware
});

app.get('/api', logger, (req, res): void => {
  res.send('Server Working!');
});

app.listen(port, (): void => {
  console.log(`server started at port:${port}`);
});

export default app;
