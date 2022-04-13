/* 
Requirement: I wanted to create windows 10 theme of all country flags.
Challenge: Images of all flags are named as country code instead of Full name, Example: "IND.eps". Need to convert to "INDIA.ESP" refering excel file. (DOING MANUALLY WILL BE 4-5h WORK)
Input: Excel file to map correct country code with full name, Folder of 256 images containing files named as IND.eps, CA.eps
Output: Images renamed to full country name. EX INDIA.ESP
*/

const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

// Get path to image directory
const imageDirPath = resolve(__dirname, 'Country Flags');

var countryCode=[], countryName=[];
var name, finax, position;

// Get an array of the files inside the folder
const files = readdirSync(imageDirPath);

// Get an array of Excel file to rename matching Country Code
const xlsxFile = require('read-excel-file/node');
xlsxFile('./CountryName.xlsx').then((rows) => {

   rows.forEach((item, i) => {
     countryCode[i] = item[1];
     countryName[i] = item[0];
   });
//console.log(countryName);

files.forEach((file, i) => {

    name = file.split(".");
    finax = name[0].toUpperCase();

    position = countryCode.indexOf(finax);

    //console.log(finax);

    if (position>=0)
    {

        rename(
            imageDirPath + `/${file}`,
            imageDirPath + `/${countryName[position].toUpperCase()}` + ".EPS",
            err => console.log(err)
        )

    }

//console.log(position);
});

})