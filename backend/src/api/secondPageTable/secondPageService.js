import { Service } from "../../helper/common/index.js";
import SecondPageSchema from "./secondPageModel.js";
import { v4 as uuidv4 } from "uuid";

class SecondPageService extends Service {
  constructor(model) {
    super(model);
  }

  async saveData(req) {
    try {
      const receivedData = req.body;
      const totalCount = receivedData?.length;
      const fileName = uuidv4();
      const record = await SecondPageSchema.create({
        fileName: `${fileName}.json`,
        createdAt: `${new Date().toISOString()}`,
        csvData: receivedData,
        totalCount: totalCount,
      });
      return record;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SecondPageService(SecondPageSchema);
