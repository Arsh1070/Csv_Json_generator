export default class Response {
  static success(res, data, status = 200) {
    res.status(status);
    // console.log({ data });
    if (data && data.docs && !!data.isPaginated) {
      return res.json({
        data: {
          status: "success",
          results: data.docs,
          total: data.totalDocs,
          limit: data.limit,
          page: data.page,
          pages: data.totalPages,
        },
      });
    } else if (data && data.docs) {
      data = data.docs || [];
      return res.json({
        data: {
          status: "success",
          results: data,
        },
      });
    }
    return res.json({
      status: "success",
      data: data,
    });
  }

  static error(res, error, status = 400) {
    let response = {
      //success: 'failed',
      message: error.message,
      errorCode: error.code,
    };
    if (status === 400) {
      response["field"] = error.errors;
    }
    res.status(status);
    return res.json(response);
  }
}
