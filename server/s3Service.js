const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp")
const uuid = require("uuid").v4;

exports.s3Upload = async (files, path) => {

    const s3client = new S3Client();

    const params = await Promise.all(files.map(async (file) => { 
        try {

            const buffer = await sharp(file.buffer)
                                .jpeg({quality: 70})
                                .png({quality: 80})
                                .toBuffer()
            return {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${path}/${uuid()}-${file.originalname}`,
                Body: buffer
            }   
        } catch (err) {
            throw new Error(err)
        }
    }));

    //Images sent to S3 Bucket
    await Promise.all(
        params.map(param => s3client.send(new PutObjectCommand(param))
    ));

    //Url Key to be stored in db
    const urls = params.map(param => {
        return param.Key.split("/")[2]
    })

    return urls
}

exports.s3RemoveImages = async(path, keys) => {

    const s3Client = new S3Client();

    //Build params for delete object request
    const params = keys.map(k => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `uploads/${path}/${k}`
        }
    })

    //Return promise
    return await Promise.all(
        params.map(param => {
            return s3Client.send(new DeleteObjectCommand(param));
        })
    )
}