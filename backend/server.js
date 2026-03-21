require("dotenv").config();

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")
const path = require("path")
const authRoutes = require("./routes/auth.routes")
const uploadRoutes = require("./routes/upload.routes")
const bookRoutes = require("./routes/book.routes")
const audioRoutes = require("./routes/audio.routes")
const voiceRoutes = require("./routes/voice.routes");
const ttsRoutes = require("./routes/tts.routes");

const app = express()

// 1️⃣ Middleware first
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// 2️⃣ Connect database
connectDB()

// 3️⃣ Routes after middleware
app.use("/api/auth", authRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/audio", require("./routes/audio.routes"));
app.use("/api/voices", require("./routes/voice.routes"));
app.use("/api/tts", require("./routes/tts.routes"));
app.use("/api/user", require("./routes/user.routes"));




// 4️⃣ Test route
app.get("/", (req, res) => {
  res.json({ message: "Narrify backend is running 🚀" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
