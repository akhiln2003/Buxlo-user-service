import { Router } from "express";
import { DIContainer } from "../../infrastructure/di/DIContainer";
import { FetchMentorProfileController } from "../controllers/mentor/fetchMentorProfileController";
import { UpdateMentorProfileController } from "../controllers/mentor/updateMentorProfileController";
import multer from "multer";
import { FetchMentorProfileImageController } from "../controllers/mentor/fetchMentorProfileImageController";
import { DeleteMentorProfileImageController } from "../controllers/mentor/deleteMentorProfileImageController";
import { fetchprofileDto } from "../../zodSchemaDto/mentor/fetchprofile.Dto";
import {  validateReqBody, validateReqParams } from "@buxlo/common";
import { fetchprofileimageDto } from "../../zodSchemaDto/mentor/fetchprofileimage.Dto";
import { deleteprofileimageDto } from "../../zodSchemaDto/mentor/deleteprofileimage.Dto";
import { MentorVerifyprofileController } from "../controllers/mentor/mentorVerifyprofileController";
import { verifyProfileDto } from "../../zodSchemaDto/mentor/verifyprofile.Dto";

const router = Router();
const diContainer = new DIContainer();

const upload = multer({ storage: multer.memoryStorage() });

// Inject dependencies into the Controller

const fetchprofileController = new FetchMentorProfileController(
  diContainer.fetchMentorProfileUseCase()
);

const updateprofileController = new UpdateMentorProfileController(
  diContainer.updateMentorProfileUseCase()
);

const fetchProfileImageController = new FetchMentorProfileImageController(
  diContainer.fetchProfileImageUseCase()
);

const deleteProfileImageController = new DeleteMentorProfileImageController(
  diContainer.deleteMentorProfileImageUseCase()
);

const mentorVerifyprofileController = new MentorVerifyprofileController(
  diContainer.mentorVerifyprofileUseCase()
);
/////////////////////////////////////

// i wand to add middleware for validate endpoints

router.get(
  "/fetchprofile/:id",
  validateReqParams(fetchprofileDto),
  fetchprofileController.fetchData
);
router.put(
  "/updateprofile",
  upload.single("newProfileImage"),
  updateprofileController.update
);
router.get(
  "/fetchprofileimage/:key",
  validateReqParams(fetchprofileimageDto),
  fetchProfileImageController.fetchImage
);
router.delete(
  "/deleteprofileimage/:id/:key",
  validateReqParams(deleteprofileimageDto),
  deleteProfileImageController.deleteImage
);
router.put(
  "/verifyprofile",
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  validateReqBody(verifyProfileDto),
  mentorVerifyprofileController.verify
);

export { router as mentorRoutes };
