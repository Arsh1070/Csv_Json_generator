import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const STATUS = {
  PENDING: "Pending",
  INCORPORATED: "Changes Incorporated",
  REJECTED: "Changes Rejected",
};

const TableDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  /*     status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    }, */
});

TableDataSchema.plugin(mongoosePaginate);

export default mongoose.model(
  "FirstPageTable",
  TableDataSchema,
  "FirstPageTableData"
);
