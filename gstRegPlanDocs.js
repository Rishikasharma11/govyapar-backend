const mongoose = require("mongoose");

const GstRegPlanDocsScehma = new mongoose.Schema(
    {
        name: String,
        email: String,
        pan_number: String,
        aadhar_card_number: String,
        phone_number: Number,
        proprietor_or_partner_photo: String,
        rent_agreement_or_noc_or_ownership_proof: String,
        address_proof_or_electricity_bill: String,
    }, 
    {collection: "GstRegPlanDocs"}, 
    {timestamps: true})

mongoose.model("GstRegPlanDocs", GstRegPlanDocsScehma) 