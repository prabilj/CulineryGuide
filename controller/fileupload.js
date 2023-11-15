const Recipe = require('../model/recipeschema')
const aws = require('aws-sdk');
const  model  = require('mongoose');
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config();
const accessKeyId = process.env.aws_access_key_id;
const secretAccessKey = process.env.aws_secret_access_key;

console.log(accessKeyId,secretAccessKey)

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  });



const s3 = new aws.S3
const fileupload = async (req, res) => {
try{
    const { originalname, buffer } = req.file;
    console.log(buffer)
    const params = {
      Bucket: "blogsphere-ab",
      ACL: "public-read",
      ContentType: req.file.mimetype,
      Key: `prabil/${originalname}`,
      Body: buffer
    };
     
    const uploadedFile = await s3.upload(params).promise();
    const params1 = {
      Image: uploadedFile.Location
    }



    console.log(uploadedFile.Location)
    res.send(uploadedFile.Location)
   // console.log(params1);
   // console.log(result);



  } catch (err) {
    console.log(err)
    res.send(err)
  }

}
 
module.exports.fileupload=fileupload  