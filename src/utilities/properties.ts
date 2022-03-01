import express from 'express';
import { isString } from 'lodash';

class Properties {
    public width:number;
    public height:number;
    public filePath:string;
    public createdPath:string;
    constructor(width:number, height:number, filePath:string, createdPath:string) {
        this.height = height;
        this.width = width;
        this.filePath = filePath;
        this.createdPath = createdPath;
    }
}

const properties = async(
    req: express.Request,
    next: Function  
): Promise<Properties> => {
    const path = await import ('path');
    const fs = await import ('fs');
    try {
        if (!(req.query.filename) || !(req.query.height) || !(req.query.width)) {
            throw new Error('Missing Parameter');
        }
        const filePath = "assets/full/"+req.query.filename+".jpg";
        const resolvedfilePath = path.resolve(filePath);

        if (!isString(filePath)) {
            throw new Error('Invalid file path format');
        }
        if (!(fs.existsSync(resolvedfilePath))) {
            throw new Error('Image does not exist');
       }
        const heightPicked = (req.query.height) as string;
        const height: number = parseInt(heightPicked);
        if (isNaN(height)) {
            throw new Error('Height should be a number');
        }
        const widthPicked = (req.query.width) as string;
        const width: number = parseInt(widthPicked);
        if (isNaN(width)) {
            throw new Error('Width should be a number');
        }
        const createdPath = "assets/thumb/"+req.query.filename+req.query.height+req.query.width+".jpeg";
        return new Properties(width, height, filePath, createdPath);
    }
    catch (err) {
        next(err);
        throw new Error('Could not resize the image');
    }
    
};


export default properties;