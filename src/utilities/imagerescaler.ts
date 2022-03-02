import e from 'express';
import express from 'express';
import sharp from 'sharp';
import properties from './properties';
import rescaler from './imageScaleFunction';


const scaler = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  const path = await import('path');
  const fs = await import('fs');
  const image_properties = await properties(req, next);
  try {
  if (fs.existsSync(image_properties.createdPath)) {
    res.sendFile(image_properties.createdPath, {root:"."});
  } else {
    var created = await rescaler(image_properties.height, image_properties.width, image_properties.filePath, image_properties.createdPath)
    if (created) {
        res.sendFile(image_properties.createdPath, {root:"."});
        next();
    } else {
      throw new Error('Failed to create image');
    }
    }
  }  catch (err) {
    next(err);
  }
  };

export default scaler;
