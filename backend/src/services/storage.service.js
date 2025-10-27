import ImageKit from "@imagekit/nodejs";
import { configDotenv } from "dotenv";

configDotenv();

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (file, fileName) => {
    try {
        const result = await client.files.upload({
            file: file,
            fileName: fileName,
            useUniqueFileName: true,
            folder: "uploads",
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
