import express from "express"
import { changeJobApplicationsStatus, changeJobVisibility, getCompanyJobApplicants, getCompanyPostedJobs, getCompanyData, loginCompany, postJob, registerCompany } from "../controllers/companyConroller.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Register a company
router.post("/register", upload.single('image'), registerCompany)

// Company login
router.post("/login", loginCompany)

// Get company data
router.get("/company", protectCompany, getCompanyData)

// Post a job
router.post("/post-job", protectCompany, postJob)

// Get Applicants data of company
router.get("/applicants", protectCompany, getCompanyJobApplicants)

// Get company Job List
router.get("/list-jobs", protectCompany, getCompanyPostedJobs)

// Change Application Status
router.post("/change-status", protectCompany, changeJobApplicationsStatus)

// Change Applications Visibility
router.post("/change-visibility", protectCompany, changeJobVisibility)

export default router