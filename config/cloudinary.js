import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Readable } from "stream";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (buffer) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ folder: "smallshop" },
			(error, result) => {
				if (error) reject(error);
				else resolve(result);
			},
		);
		Readable.from(buffer).pipe(stream);
	});
};

export default cloudinary;
