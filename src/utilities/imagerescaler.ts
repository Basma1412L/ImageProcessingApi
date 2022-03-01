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
  const resolvedCreatedPath = path.resolve(image_properties.createdPath);
  if (fs.existsSync(resolvedCreatedPath)) {
    res.sendFile(resolvedCreatedPath);
  } else {
    rescaler(image_properties.height, image_properties.width, image_properties.filePath, image_properties.createdPath)
    .then(() => {
      res.sendFile(resolvedCreatedPath);
    })
    .catch((err) => next(err));
    next();
  }
};

export default scaler;
