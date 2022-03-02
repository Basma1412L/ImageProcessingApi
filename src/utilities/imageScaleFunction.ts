import sharp from 'sharp';

const rescaler = async (
  height: number,
  width: number,
  filePath: string,
  createdPath: string
): Promise<boolean> => {
  const img =  sharp(filePath).resize(width, height).flatten();
  const created = await img.toFile(createdPath);
  if (created) {
    console.log('Created!');
    return true;
  }
  return false;
  
};

export default rescaler;
