import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { config } from '../configs';

class S3Service {
    Bucket;

    constructor() {
        this.Bucket = new S3({
            region: config.S3_REGION,
            accessKeyId: config.S3_ACCESS_KEY,
            secretAccessKey: config.S3_SECRET_KEY,
        });
    }

    public uploadFile(file: UploadedFile, itemType: string, itemId: number): Promise<ManagedUpload.SendData> {
        const pathBuilder = this._pathBuilder(file.name, itemType, itemId);

        return this.Bucket.upload({
            Bucket: config.S3_NAME as string,
            Key: pathBuilder,
            Body: file.data,
            ContentType: file.mimetype,
            ACL: 'public-read',
        })
            .promise();
    }

    private _pathBuilder(name: string, itemType: string, itemId: number): string {
        const expansion = path.extname(name);
        return `photos/${itemType}/${itemId}/${uuidv4()}${expansion}`;
    }
}

export const s3Service = new S3Service();
