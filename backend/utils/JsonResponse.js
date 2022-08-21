const JsonResponse = (success, data, message) => {
  let res = {};
  res.success = success;
  if (success) res.data = data;
  if (!success) res.message = data;
  return res;
};
const JsonResponseWithMSG = (success, message, data = null) => {
  let res = { success, message, data };
  return res;
};
module.exports = { JsonResponse, JsonResponseWithMSG };
