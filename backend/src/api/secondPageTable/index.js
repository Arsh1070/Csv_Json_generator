//import { celebrate } from "celebrate";
import express from "express";
import SecondPageController from "./secondPageController.js";
/* import {
  formValidateSchema,
  tableRowValidateSchema,
} from "./formValidateSchema.js"; */

const router = express.Router();

router.post(
  "/",
  // celebrate({ body: formValidateSchema }, { abortEarly: false }),
  SecondPageController.saveTableData
);

router.get(
  "/",
  // celebrate({ query: paginateSuggestionValidateSchema }),
  SecondPageController.getAllTableResults
);

export default router;
