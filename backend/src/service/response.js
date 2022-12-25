// https://github.com/cryptlex/rest-api-response-format
export default class Response {
  static success(res, data, status = 200) {
    res.status(status);
    if (data && data.docs) {
      return res.json({
        status: "success",
        results: data.docs,
        limit: data.limit,
        page: data.page,
        pages: data.pages,
        total: data.totalDocs,
        // total: data.pages * data.limit,
      });
    }
    return res.json({
      status: "success",
      data: data,
    });
  }

  static existing(res, data, status = 302) {
    return res.json({
      status: "Email already exist",
      results: data,
    });
  }

  static error(res, error, status = 400) {
    res.status(status);
    return res.json({
      message: "Bad request",
      //"field":  error.errors,
      errorCode: 400,
    });
  }
}
