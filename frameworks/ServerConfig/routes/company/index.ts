import express, { NextFunction, Request, Response } from "express";
import { InCompanyController } from "../../controllers/instances";
import { validateInputs } from "../../middlewares/validation";
import { addCompanySchema, updateCompanySchema } from "../../validationSchemas/CompanySchema";
import multer from 'multer';
import dotenv from "dotenv"
dotenv.config();

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.env.STORAGE_DIR_PATH}/companies/`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
})
const upload = multer({ storage: storage })

router.post("/", upload.single('logo'), validateInputs(addCompanySchema), (req: Request, res: Response, next: NextFunction) =>
  InCompanyController.add(req, res, next)
);
router.patch("/:id", upload.single('logo'), validateInputs(updateCompanySchema), (req: Request, res: Response, next: NextFunction) =>
  InCompanyController.update(req, res, next)
);

export default router;
