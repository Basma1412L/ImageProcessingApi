import e from 'express';
import express from 'express';
import sharp from 'sharp';
import properties from './properties';


const rescaler = async (
    height: number,
    width: number,
    filePath: string,
    createdPath: string
): Promise<void> => {
    const path =await import ('path');
    const fs = await import ('fs');
    const resolvedCreatedPath =  path.resolve(createdPath);
    if ((fs.existsSync(resolvedCreatedPath))) {
        console.log("Found!");
    } else {
        sharp(filePath)
        .resize(width, height)
        .flatten()
        .toFile(createdPath)   
        .then(() => {
            console.log("Created!");
        })
        .catch( (err) => console.log("Error"));
    }
    };


export default rescaler;