import AppError from "./appError";

export function verifyImage(file: File) {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop() as string;
    const isAllowed = allowedExtensions.includes(extension);
    if (!isAllowed) {
        throw new AppError('File type not allowed',400);
    }
    
    // size less than 5MB
    if (file.size > 5 * 1024 * 1024) {
        throw new AppError('File size is too large', 400);
    }
}