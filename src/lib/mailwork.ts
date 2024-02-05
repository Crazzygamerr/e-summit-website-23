import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

// const mailWork = async (to, name, UPI) => {
const mailWork = async (to: string, name: string, UPI: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esummit@snu.edu.in",
      pass: "oayzcjekigkicdjd",
    },
  });

  const mailOptions = {
    from: "esummit@snu.edu.in",
    to,
    subject: "E-Summit, Shiv Nadar University | Payment Processing",
    html: `<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
				}
				h3 {
					color: #333333;
				}
				a {
					color: #3498db;
				}
			</style>
		</head>
		<body>
			<h3>Congratulations!✨</h3>
      <p>
      Hey ${name},
      <br />
      We have received payment from the UPI ID: ${UPI}
      <br />
      You’ll receive a confirmation mail for your delegation within 24 hours, after your request has been processed.
      <br />
      Thank you for your patience. We look forward to hosting you at one of the largest events on this campus.
      <br />
      Stay curious. Keep building.
      <br />
      Regards,
      <br />
      --
      <br />
      Core Committee
      <br />
      Entrepreneurship Cell, SNU
      
      </p>
		</body>
	</html>`,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) console.error(error);
    else console.log("Email sent: " + info.response);
  });
};

export const wifiMailwork = async (
  to: string,
  name: string,
  username: string,
  password: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "esummit@snu.edu.in",
      pass: "oayzcjekigkicdjd",
    },
  });

  const mailOptions = {
    from: "esummit@snu.edu.in",
    to,
    subject: "E-Summit, Shiv Nadar University | WiFi Credentials",
    html: `<html>
		<head>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
				}
				h3 {
					color: #333333;
				}
				a {
					color: #3498db;
				}
			</style>
		</head>
		<body>
			<h3>Your WiFi credentials are attached!</h3>
      <p>
      Hey ${name},
      <br />
      <br />
      You'll be connecting to the "Guest" WiFi network onsite, using these credentials.
      <br />
      <br />
      Username: ${username}
      <br />
      Password: ${password}
      <br />
      <br />
      Stay curious. Keep building.
      <br />
      <br />
      Regards,
      <br />
      --
      <br />
      Core Committee
      <br />
      Entrepreneurship Cell, SNU
      
      </p>
		</body>
	</html>`,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) console.error(error);
    else console.log("Email sent: " + info.response);
  });
};

export default mailWork;
