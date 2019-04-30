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
exports.getTeamsById = (teams_id) => {
  return handler(queries.getTeamsById, [teams_id], true, db.one);
}
exports.getMatch = (tournament_id) => {
  return handler(queries.getMatchs, [tournament_id], true, db.any);
}

exports.getAllCountrys = () => {
  return handler(queries.getAllCountrys, db.many);
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

exports.getUserData = (userId) => {
  return handler(queries.getProfileUser,[userId], true, db.one);
}

exports.getProfileBets = (userId) => {
  return handler(queries.getProfileBets,[userId], true, db.any);
}

exports.postBet = (matchId, userId, betPayment, betOdd, team1Score, team2Score) => {
  return handler(queries.postBet, [matchId, userId, betPayment, betOdd, team1Score, team2Score], true, db.one);
}

exports.getBets = (userId) => {
  return handler(queries.getBets, [userId], true, db.any);
}

exports.newTournament = (type, country, name) => {
  return handler(queries.createTournament, [type,country,name], db.none);
}

exports.deleteTournament = (TournamentId) => {
  return handler(queries.deleteTournament, [TournamentId], db.none);
}

exports.newTeam = (country, name, pic, desc) => {
  return handler(queries.createTeam, [country, name, pic, desc], db.none);
}

exports.editTeam = (name, pic, avg, desc, country, teamId) => {
  return handler(queries.updateTeam, [name, pic, avg, desc, country, teamId], db.none);
}

exports.deleteTeam = (teamId) => {
  return handler (queries.deleteTeam, [teamId], db.none);
}

exports.createMatch = (tournamentId, group_id, match_date) => {
  return handler(queries.createMatch, [tournamentId, group_id, match_date], true, db.one);
}

exports.updateMatch = (winner, matchId) => {
  return handler(queries.updateMatch, [true, winner, matchId], db.none);
}

exports.deleteMatch = (matchId) => {
  return handler(queries.deleteMatch, [matchId], db.none);
}

exports.createMatchParticipants = (status, teamId, matchId) =>{
  return handler(queries.createMatchParticipants, [status, teamId, matchId], db.none);
}

exports.getMatchParticipants = (matchId) => {
  return handler(queries.getMatchParticipants, [matchId], true, db.any);
}

exports.editParticipants = (score, matchId, teamId) => {
  return handler(queries.editMatchParticipants, [score, matchId, teamId], db.none);
}

exports.getBetsByDay = (date) => {
return handler(queries.getBetsInDay, [date], true, db.any);
}

exports.getBetsByRange = (date) => {
  return handler(queries.getBetsInRange, [date], true, db.any);
}

exports.getAllBets = () => {
  return handlerWithNoParams (queries.getAllBets, db.any);
}

//exports.deleteBet = (bet)

