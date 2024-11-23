const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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

    await Promise.all(
        params.map(param => s3client.send(new PutObjectCommand(param))
    ));

    const urls = params.map(param => {
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${param.Key}`
    })

    return urls;
}