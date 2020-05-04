const CONFIG = require('config');
const Minio = require('minio');

async function saveFileS3Local(encodedFileName, imageBuffer) {
    const {hostName, port} = new URL(CONFIG.get('minio'));
    console.log(hostName)
    console.log(port)
    const minioClient = new Minio.Client({
        endPoint: '192.168.99.100',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin',
    })

    const bucket = 'test';

    const exists = await minioClient.bucketExists(bucket)

    if (!exists) {
        await minioClient.makeBucket(bucket);
    }

    minioClient.putObject(bucket, 'second.png', imageBuffer, (error, etag) => {
        if (error) {
            console.error(error);
        } else {
            console.info('Success upload data')
        }
    })
}

module.exports = saveFileS3Local;