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

exports.tournamentRanking = (tournament_id) => {
  return handler(queries.tournamentRanking, [tournament_id], true, db.any);
}

exports.tournamentInfo = (tournament_id) => {
  return handler(queries.tournamentInfo, [tournament_id], true, db.one);
}

exports.updateUser = (userId, userName, userEmail, userCreditCard, userBankAccount) => {
  return handler(queries.putProfile, [userName, userEmail, userCreditCard, userBankAccount, userId]);
}

exports.postBet = (matchId, userId, betPayment, betOdd, team1Score, team2Score) => {
  return handler(queries.postBet, [matchId, userId, betPayment, betOdd, team1Score, team2Score], true, db.one);
}

exports.getBets = (userId) => {
  return handler(queries.getBets, [userId], true, db.any);
}

//exports.deleteBet = (bet)

