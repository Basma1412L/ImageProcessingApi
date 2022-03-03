import e, { NextFunction } from 'express';
import express from 'express';
import sharp from 'sharp';
import properties from './properties';
import rescaler from './imageScaleFunction';

const scaler = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): Promise<void> => {
  const path = await import('path');
  const fs = await import('fs');
  try {
  const image_properties = await properties(req, res, next);
  if (fs.existsSync(image_properties.createdPath)) {
    res.sendFile(image_properties.createdPath, { root: '.' });
  } else {
    const created = await rescaler(
      image_properties.height,
      image_properties.width,
      image_properties.filePath,
      image_properties.createdPath
    );
    if (created) {
      res.sendFile(image_properties.createdPath, { root: '.' });
    } else {
      throw new Error('Failed to create image');
    }
  }
  } catch (err) {
    if (err instanceof Error) {
      res.send(err.message);
    }
  }
};

export default scaler;
