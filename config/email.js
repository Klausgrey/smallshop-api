// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// dotenv.config();

// const transporter = nodemailer.createTransport({
// 	service: "gmail",
// 	auth: {
// 		user: process.env.EMAIL,
// 		pass: process.env.EMAIL,
// 	},
// });

// export const sendEmail = async ({ to, subject, text }) => {
// 	await transporter.sendMail({
// 		from: process.env.EMAIL,
// 		to,
// 		subject,
// 		text,
// 	});
// };

// export default transporter;

import nodemailer from "nodemailer";

let transporter;

const initTransporter = async () => {
	const testAccount = await nodemailer.createTestAccount();

	transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	console.log("Ethereal email:", testAccount.user);
	console.log("Ethereal password:", testAccount.pass);
};

initTransporter();

export const sendEmail = async ({ to, subject, text }) => {
	const info = await transporter.sendMail({
		from: "smallshop@test.com",
		to,
		subject,
		text,
	});

	console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
};