const db = require("../config/db");
const transporter = require("../utils/mailer");

let codes = {};

// SEND CODE
exports.sendCode = async (req, res) => {
  const { email } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000);
  codes[email] = code;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verification Code",
      text: `Your verification code is: ${code}`
    });

    res.json({ success: true, message: "Code sent!" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error sending email" });
  }
};

// VERIFY CODE
exports.verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (codes[email] && codes[email] == code) {
    return res.json({ success: true });
  }

  res.json({ success: false });
};

// REGISTER
exports.registerUser = (req, res) => {
  const { fullName, email, password } = req.body;

  const sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [fullName, email, password], (err) => {
    if (err) {
      return res.json({ success: false, message: "Email already exists" });
    }

    res.json({ success: true, message: "Account created!" });
  });
};
