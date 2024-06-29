import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const uploadFile = (dirname: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.env.STORAGE_DIR_PATH}/${dirname}/`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname +
          "-" +
          uniqueSuffix +
          "." +
          file.originalname.split(".").pop()
      );
    },
  });
  const upload = multer({ storage: storage });

  return upload;
};

export default uploadFile