import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import multer from "multer";
import { CreateTrustedUsUsController } from "../controllers/admin/createTrustedUsUsController";
import { FetchtrustedusController } from "../controllers/admin/fetchtrustedusController";
import { FetchtrustedusImageController } from "../controllers/admin/fetchtrustedusImageController";
import { DeleteTrustedUsImageController } from "../controllers/admin/deleteTrustedUsImageController";
import { DdeleteAdvImageController } from "../controllers/admin/deleteAdvImageController";
import { CreateAdvController } from "../controllers/admin/createAdvController";
import { FetchAdvController } from "../controllers/admin/fetchAdvController";
import { FetchAdvImageController } from "../controllers/admin/fetchAdvImageController";
import { EditAdvController } from "../controllers/admin/editAdvController";
import {
  validateReqBody,
  validateReqParams,
  validateReqQueryParams,
} from "@buxlo/common";
import { createadvDto } from "../../zodSchemaDto/admin/createadvDto";
import { fetchTrustedUsAndAdvImageDto } from "../../zodSchemaDto/admin/fetchadvimageDto";
import { fetchtrustedusAndAdvDto } from "../../zodSchemaDto/admin/fetchtrustedusAndAdvDto";
import { verifyProfileDto } from "../../zodSchemaDto/admin/verifyProfileDto";
import { deleteAdvAndTrustedUsimageDto } from "../../zodSchemaDto/admin/deleteAdvAndTrustedUsimageDto";
import { VerifyprofileController } from "../controllers/admin/verifyprofileController";
import { fetchverifyprofileDto } from "../../zodSchemaDto/admin/listverifyprofileDto";
import { FetchVerifyProfileController } from "../controllers/admin/fetchVerifyProfileController";
import { FethAadhaarImagesController } from "../controllers/admin/fethAadhaarImagesController";
import { fetchAadhaarImagesDto } from "../../zodSchemaDto/admin/fethAadhaarImagesDto";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

const diContainer = new DIContainer();

// Inject dependencies into the Controller

const createAdvController = new CreateAdvController(
  diContainer.createAdvUsecase()
);

const fetchAdvController = new FetchAdvController(
  diContainer.fetchAdvUseCase()
);

const fetchAdvImageController = new FetchAdvImageController(
  diContainer.fetchS3ImageUseCase()
);

const createTrustedUsUsController = new CreateTrustedUsUsController(
  diContainer.createTurstedUsUsecase()
);

const fetchtrustedusController = new FetchtrustedusController(
  diContainer.fetchtrustedUsUseCase()
);

const fetchtrustedusImageController = new FetchtrustedusImageController(
  diContainer.fetchS3ImageUseCase()
);

const deleteTrustedUsImageController = new DeleteTrustedUsImageController(
  diContainer.deleteTrustedUsUseCase()
);

const deleteAdvImageController = new DdeleteAdvImageController(
  diContainer.deleteAdvUseCase()
);

const editAdvController = new EditAdvController(diContainer.editAdvUseCase());

const fetchVerifyProfileController = new FetchVerifyProfileController(
  diContainer.adminFetchVerifyProfilesUseCase()
);

const verifyprofileController = new VerifyprofileController(
  diContainer.adminVerifyprofileUseCase()
);

const fethAadhaarImagesController = new FethAadhaarImagesController(
  diContainer.fetchS3ImageUseCase()
);

/////////////////////////////////////

router.post(
  "/createadv",
  validateReqBody(createadvDto),
  upload.single("image"),
  createAdvController.create
);
router.get(
  "/fetchadv",
  validateReqQueryParams(fetchtrustedusAndAdvDto),
  fetchAdvController.fetchData
);
router.post(
  "/fetchadvimage",
  validateReqBody(fetchTrustedUsAndAdvImageDto),
  fetchAdvImageController.fetchImages
);
router.delete(
  "/deleteadvimage/:id/:key",
  validateReqParams(deleteAdvAndTrustedUsimageDto),
  deleteAdvImageController.deleteImage
);
router.post(
  "/createtrustedus",
  upload.single("image"),
  createTrustedUsUsController.create
);
router.get(
  "/fetchtrustedus",
  validateReqQueryParams(fetchtrustedusAndAdvDto),
  fetchtrustedusController.fetchData
);
router.post(
  "/fetchtrustedusimage",
  validateReqBody(fetchTrustedUsAndAdvImageDto),
  fetchtrustedusImageController.fetchImages
);
router.delete(
  "/deletetrustedusimage/:id/:key",
  validateReqParams(deleteAdvAndTrustedUsimageDto),
  deleteTrustedUsImageController.deleteImage
);
router.post("/editadv", upload.single("image"), editAdvController.edit);
router.get(
  "/fetchverifyprofiledata",
  validateReqQueryParams(fetchverifyprofileDto),
  fetchVerifyProfileController.fetch
);
router.post(
  "/fetchaadhaarimages",
  validateReqBody(fetchAadhaarImagesDto),
  fethAadhaarImagesController.get
);
router.put(
  "/verifyprofile",
  validateReqBody(verifyProfileDto),
  verifyprofileController.verify
);

export { router as adminRoutes };
