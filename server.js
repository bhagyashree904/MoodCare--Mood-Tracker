
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("✅ MongoDB connected");
//   app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// })
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');
// const moodRoutes = require('./routes/moodRoutes');



// const app = express();
// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ DB Error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/entries', moodRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// app.get("/", (req, res) => {
//   res.send("MoodCare API is running ✅");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Your routes
// const moodRoutes = require("./routes/moodRoutes");
// app.use("/api/moods", moodRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Default route to avoid 'Cannot GET /'
app.get("/", (req, res) => {
  res.send("MoodCare API is running ✅");
});
