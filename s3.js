require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const S3 = new S3 ({
    region,
    accessKeyId,
    secretAccessKey
})

// Upload file to S3
export function uploadFile(file) {

}

// Downloads from S3