# ImageProcessingApi
This project allows users to resize ttheir image by sending the image dimensions in the url

The server runs on port 3000
The filename should be sent in the url as long as the width and the height; ex: http://localhost:3000/api/images?filename=palmtunnel&width=1000&height=500

To be able to rescale an image add it to the assets/full directory, then send the desired dimensions in the url.
The resized images will be added to assets/thumb directory.

The server can be run using: npm run start
The test script can be run using: npm run test

