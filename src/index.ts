// Import readline module for getting input from console
// Find more here: https://nodejs.org/api/readline.html#readline_readline
// import readline from 'readline';
// import _ from 'lodash';
import express from 'express';
import logger from './utilities/logger';
import sharp from 'sharp';

const app = express();
const port = 3000;

app.use('/assets/full', express.static('assets/full'));

app.get('/api/images', logger, async (req, res) => {
    const path =await import ('path');
    const filePath = "assets/full/"+req.query.filename+".jpg";
    const createdPath = "assets/thumb/"+req.query.filename+".jpeg";
    const heightPicked = (req.query.height) as string;
    const height: number = parseInt(heightPicked);
    const widthPicked = (req.query.width) as string;
    const width: number = parseInt(widthPicked);
    sharp(filePath)
    .resize(width, height)
    .flatten()
    .toFile(createdPath)
    .then(() => {
        const resolvedCreatedPath =  path.resolve(createdPath);
        res.sendFile(resolvedCreatedPath);        
    })
    .catch( () => res.send('Error: File does not exist!'));
}); 

app.get('/api', logger, (req, res) => {
    res.send('Server Working!');
}); 
 
app.listen(port, () => {
    console.log(`server started at port:${port}`);
})


export default app;
