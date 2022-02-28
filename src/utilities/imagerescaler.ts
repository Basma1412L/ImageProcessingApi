import express from 'express';
import sharp from 'sharp';


const scaler = async (
    req: express.Request, 
    res: express.Response, 
    next: Function
): Promise<void> => {
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
    next();
};


export default scaler;