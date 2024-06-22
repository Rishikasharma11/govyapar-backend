const mongoose = require ("mongoose");

const itrSalaryPlanDocsSchema = new mongoose.Schema(
    {
        // -------------------------------schema field name should be same as form input field name ----------------------
        name: String,
        email: String,
        pan_number: String,
        phone_number: Number,
        assesment_year: String,
        form_16: String,
        investment_proof: String,
    }, 
    {collection: "ItrSalaryPlanDocs"},
    {timestamps: true})

mongoose.model("ItrSalaryPlanDocs" ,itrSalaryPlanDocsSchema)

