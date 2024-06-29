import AppError from "./appError";
import dotenv from "dotenv";

dotenv.config();

export function verifyImage(file: Express.Multer.File): string {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.filename.split('.').pop() as string;
    const isAllowed = allowedExtensions.includes(extension);
    if (!isAllowed) {
        throw new AppError('File type not allowed',400);
    }
    
    // size less than 5MB
    if (file.size > 5 * 1024 * 1024) {
        throw new AppError('File size is too large', 400);
    }
    
    const destination = file.destination.replace(".","");
    const image_url = `${process.env.WEB_SERVER_HOST}:${process.env.WEB_SERVER_PORT}${destination}${file.filename}`;

    return image_url
}