 const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
 const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());

// DATABASE
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pfe_db"
});

// NODEMAILER SETUP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "salima.azar@etu.uae.ac.ma",    
        pass: "gcdjoxbocwfjqlxl"     }    
});

// REGISTER + SEND VERIFICATION EMAIL
 // REGISTER + SEND VERIFICATION EMAIL
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.json({ status: "ERROR", message: "جميع المعلومات ضرورية" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = crypto.randomBytes(32).toString("hex");

    const sql = "INSERT INTO users (username, email, password, verified, token) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [username, email, hashedPassword, 0, token], async (err, result) => {

        
        
    });



        const verifyLink = `http://localhost:8081/verify-email/${result.insertId}/${token}`;

        // send email
        await transporter.sendMail({
            from: "Your App",
            to: email,
            subject: "تفعيل الحساب",
            html: `
                <h3>مرحبا ${username}</h3>
                <p>اضغطي على الرابط أسفله لتفعيل حسابك:</p>
                <a href="${verifyLink}">تفعيل الحساب</a>
            `
        });

        return res.json({
            status: "SUCCESS",
            message: "تم التسجيل! تحقق من بريدك الإلكتروني لتفعيل الحساب"
        });
    });


// VERIFY EMAIL
app.get("/verify-email/:id/:token", (req, res) => {
    const { id, token } = req.params;

    const sql = "SELECT * FROM users WHERE id = ? AND token = ?";
    db.query(sql, [id, token], (err, result) => {
        if (err || result.length === 0) {
            return res.send("رابط غير صالح ❌");
        }

        const updateSql = "UPDATE users SET verified = 1, token = NULL WHERE id = ?";
        db.query(updateSql, [id], () => {
            return res.send("تم تفعيل الحساب بنجاح ✔");
        });
    });
});

app.listen(8081, () => {
    console.log("Server running on port 8081");
});
