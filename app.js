require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"));

//-----------------mongodb connection----------------------------------------------
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ==============================================================ItrSalaryPlanDocs Starts=============================================
require("./itrSalaryPlanDocs");
const ItrSalaryPlanSchema = mongoose.model("ItrSalaryPlanDocs");

// ------------------------form input fields----------------------
app.post("/upload-itr-files", upload.fields([
  { name: 'file1' },
  { name: 'file2' },
]), async (req, res) => {
  const User_Name = req.body.name;
  const User_Email = req.body.email;
  const Pan_Number = req.body.pan_card_number;
  const Phone_Number = req.body.phone_number;
  const Assesment_Year = req.body.assesment_year;
  const File1 = req.files.file1 ? req.files.file1[0].filename : null;
  const File2 = req.files.file2 ? req.files.file2[0].filename : null;

  try {
    await ItrSalaryPlanSchema.create({
      name: User_Name,
      email: User_Email,
      pan_number: Pan_Number,
      phone_number: Phone_Number,
      assesment_year: Assesment_Year,
      form_16: File1,
      investment_proof: File2,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-itr-files", async (req, res) => {
  try {
    const data = await ItrSalaryPlanSchema.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
});
// ========================================================ItrSalaryPlanDocs Ends=======================================================

// ========================================================GstRegPlanDocs Starts=======================================================
require("./gstRegPlanDocs");
const GstRegPlanDocsScehma = mongoose.model("GstRegPlanDocs");

// ------------------------form input field----------------------
app.post("/upload-gst-files", upload.fields([
  { name: 'file1' },
  { name: 'file2' },
  { name: 'file3' },
]), async (req, res) => {
  const User_Name = req.body.name;
  const User_Email = req.body.email;
  const Pan_Number = req.body.pan_card_number;
  const Phone_Number = req.body.phone_number;
  const Aadhar_Card_Number = req.body.aadhar_card_number;
  const File1 = req.files.file1 ? req.files.file1[0].filename : null;
  const File2 = req.files.file2 ? req.files.file2[0].filename : null;
  const File3 = req.files.file3 ? req.files.file3[0].filename : null;

  try {
    await GstRegPlanDocsScehma.create({
      name: User_Name,
      email: User_Email,
      pan_number: Pan_Number,
      phone_number: Phone_Number,
      aadhar_card_number: Aadhar_Card_Number,
      proprietor_or_partner_photo: File1,
      rent_agreement_or_noc_or_ownership_proof: File2,
      address_proof_or_electricity_bill: File3,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-gst-files", async (req, res) => {
  try {
    const data = await GstRegPlanDocsScehma.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
});
// ========================================================GstRegPlanDocs Ends=======================================================

app.get("/", (req, res) => {
  res.send("Success!!!!!!");
});

app.listen(PORT, () => {
  console.log("Server Started on port", PORT);
});
