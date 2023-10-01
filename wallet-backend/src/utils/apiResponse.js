module.exports.successResponse = function (res, msg, data) {
    const success = true;
    return res.status(200).json({ success, message: msg, data });
  };
  
  module.exports.errorResponse = function (res, msg, statusCode = 500) {
    const success = false;
    return res.status(statusCode).json({ success, message: msg });
  };
  