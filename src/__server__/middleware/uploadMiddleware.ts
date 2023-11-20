import { DeleteObjectCommand, DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const bucketName = process.env.AWS_BUCKET_NAME!;
const region = process.env.AWS_BUCKET_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;
const secretAccessKey = process.env.AWS_SECRET_KEY!;

const clientS3 = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });

const uploadMiddleware = multer({
  storage: multerS3({
    s3: clientS3,
    bucket: bucketName,
    // acl: "public-read",
    key: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = file.originalname
        .replace(fileExtension, "")
        .toLowerCase()
        .split(" ")
        .join("-");

      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    const imgType = ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"].includes(
      file.mimetype
    );

    if (imgType) cb(null, true);
    else cb(new Error("Only JPG, PNG and JPEG file format allowed!"));
  },
});

// delete multiple files
export const deleteFiles = async (images: { Key: string }[]) => {
  const check = images.some((item) => item.Key);

  if (check) {
    const bucketParams = { Bucket: bucketName, Delete: { Objects: images } };
    return clientS3.send(new DeleteObjectsCommand(bucketParams));
  }
};

/// delete single files
export const deleteFile = (key: string) => {
  if (key) {
    return clientS3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
  }
};

export default uploadMiddleware;
