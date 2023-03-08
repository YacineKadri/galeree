// storage.js

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
    keyFilename: './key.json',
  });

const bucketName = 'galeree';

async function uploadFileToBucket(file, fileName) {
  const bucket = storage.bucket(bucketName);
  const fileUploadResponse = await bucket.upload(file.path, {
    destination: fileName,
    metadata: {
      contentType: file.mimetype,
    },
  });
  return fileUploadResponse;
}


async function getSignedUrl(fileName) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2023', // Set an expiration date for the URL
    });
    return url;
  }

module.exports = {
  uploadFileToBucket,
  getSignedUrl
};
