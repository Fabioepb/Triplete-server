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

const handlerWithNoParams = async (query, callback = db.one) => {
  try {
    const data = await callback(query);
    return data; 
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

exports.getTeams = () => {
  return handlerWithNoParams(queries.getTeams, db.many);
}

exports.getTeamsByName = (teams_name) => {
  return handler(queries.getTeamsByName, [teams_name], true, db.any);
}

exports.getMatch = (tournament_id) => {
  return handler(queries.getMatchs, [tournament_id], true, db.any);
}

exports.getTournaments = () => {
  return handlerWithNoParams(queries.getTournaments, db.many);
}

