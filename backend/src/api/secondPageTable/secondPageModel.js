import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const STATUS = {
  PENDING: "Pending",
  INCORPORATED: "Changes Incorporated",
  REJECTED: "Changes Rejected",
};

const secondTableRowSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Id: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
});

const SecondTableDataSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },

  csvData: {
    type: Array,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

SecondTableDataSchema.plugin(mongoosePaginate);

export default mongoose.model(
  "SecondPageTable",
  SecondTableDataSchema,
  "SecondPageTableData"
);
