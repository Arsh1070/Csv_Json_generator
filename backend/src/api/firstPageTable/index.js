import { celebrate } from "celebrate";
import express from "express";
import FirstPageController from "./firstPageController.js";
import {
  formValidateSchema,
  tableRowValidateSchema,
} from "./formValidateSchema.js";

const router = express.Router();

router.post(
  "/",
  celebrate({ body: formValidateSchema }, { abortEarly: false }),
  FirstPageController.saveFormData
);

router.get(
  "/",
  // celebrate({ query: paginateSuggestionValidateSchema }),
  FirstPageController.getFirstPageTableResults
);

router.put(
  "/",
  celebrate({ body: tableRowValidateSchema }),
  FirstPageController.updateTableRow
);

router.delete("/", FirstPageController.deleteTableRow);

export default router;
