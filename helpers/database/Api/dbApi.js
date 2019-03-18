const db = require('../connection/connection');
const queries = require('../queries/queries');

const handler = async (query, params, data = false, callback = db.none) => {
  try {
    const response = await callback(query, params);
    return data ? response : true;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

//Order Matters! See the query
exports.findUser =  (...params) => {
  return handler(queries.findUser, params, true, db.one);
}

exports.signUp = (...params) => {
  return handler(queries.signUp, params);
}
