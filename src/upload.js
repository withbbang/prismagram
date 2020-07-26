import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "youngstagram",
    acl: "public-read-write",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
});

export const uploadMiddleware = upload.single("file");

export const uploadController = (req, res) => {
  const {
    file: { location, key },
  } = req;

  res.json({ location, key });
};

export const deletePhoto = (req, res) => {
  const {
    body: { Key },
  } = req;
  const param = { Bucket: "youngstagram", Key };
  s3.deleteObject(param, (err, data) => {
    if (err) {
      console.log("Error : ", err);
      res.end();
    } else {
      res.json(data);
    }
  });
};
