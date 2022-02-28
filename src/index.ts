// Import readline module for getting input from console
// Find more here: https://nodejs.org/api/readline.html#readline_readline
// import readline from 'readline';
// import _ from 'lodash';
import express from 'express';
import logger from './utilities/logger';
import scaler from './utilities/imagerescaler';

const app = express();
const port = 3000;

app.use('/assets/full', express.static('assets/full'));

app.get('/api/images', scaler, async (req, res) => {
}); 

app.get('/api', logger, (req, res) => {
    res.send('Server Working!');
}); 
 
app.listen(port, () => {
    console.log(`server started at port:${port}`);
})


export default app;
