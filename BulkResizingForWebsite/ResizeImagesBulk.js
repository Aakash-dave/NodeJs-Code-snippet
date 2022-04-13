/*
Requirement: Extracted images from excel (688 files), needed to resize to ideal size to be consistant with other images
Challenge: All images are of different size, very large to small. Resizing each one by one is not an option
Input: Folder of raw images
Output: Resized images to suit display area on webpage

prerequisite task:
Images is already extracted using nodeJs code from Excel file where column A is image name & column B is images (Similar to what is done in Country flag project)
*/


const sharp = require('sharp');

const { resolve } = require('path');
const sizeOf = require('image-size');
const { readdirSync, rename } = require('fs');

// Get path to image directory
const imageDirPath = resolve(__dirname, './dummy');
const files = readdirSync(imageDirPath);

files.forEach((file, i) => {

name = file.split(".");

if (name[1] =="jpg" || name[1] =="png" )
{

const sizex = sizeOf(imageDirPath +'/'+ file);

//console.log(sizex.width, sizex.height,name );
let percentx;
let rwidth=370;
let rheight=390; // ideal size needed

if (sizex.height>rheight)
{
//console.log(sizex.width, sizex.height,name );

  if (sizex.height>390) { percentx = 95;  }
  if (sizex.height>480) { percentx = 80;  }
  if (sizex.height>600) { percentx = 70;  }


fwidth = Math.round((sizex.width*percentx)/100);
fheigth = Math.round((sizex.height*percentx)/100);

//console.log(fwidth, fheigth);

sharp(imageDirPath +'/'+ file)
  .rotate()
  .resize(fwidth,fheigth)
  .toFile(imageDirPath +'/resized/'+name[0]+'.png', (err, info) => { console.log(err); });

}

}

});
