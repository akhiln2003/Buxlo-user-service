export interface  IS3Service {
    uploadImageToBucket(bufferCode: Buffer, type: string, key: string):any;
    getImageFromBucket(key:string):any;
    deleteImageFromBucket(key: string ):any;
}