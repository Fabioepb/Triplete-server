const dbApi = require('../../../helpers/database/Api/dbApi');
const {format} = require('date-fns');

exports.getTeams = async (req, res, next) => {
  try {
    const data = await dbApi.getTeams();
    res.status(200).json({status: 200, message: 'Teams fetched', data});
  } catch (error) {
    badResponse(error, res);
  }
}

exports.getTeamsByName = async (req, res, next) => {
  try {
    const { teams_name } = req.params;
    const data = await dbApi.getTeamsByName(`%${teams_name}%`);
    res.status(200).json({status: 200, message: 'Teams fetched', data});
  } catch (error) {
    badResponse(error, res);
  }
}

exports.getMatch = async (req, res, next) => {
  try {
    const { tournament_id } = req.params;
    const _data = await dbApi.getMatch(tournament_id);
    let data = [];
    for (let i = 0; i < _data.length; i += 2) {
      let match = _data[i];
      let match2 = _data[i+1];
      let {match_played, match_winner, match_date} = match;
      match_date = format(match_date, 'MM/DD/YYYY');
      let teams = {
        local: {
          name: match.status_description === 'Local' ? match.teams_name : match2.teams_name,
          status: 'Local',
          score: match.status_description === 'Local' ? match.team_score : match2.team_score
        },
        visitante: {
          name: match2.status_description === 'Visitante' ? match2.teams_name : match.teams_name,
          status: 'Visitante',
          score: match2.status_description === 'Visitante' ? match2.team_score : match.team_score
        }
      }
      let _match = {
        match_played,
        match_winner,
        match_date,
        teams
      }
      data.push(_match);
    }
    res.status(200).json({status: 200, message: 'Matches fetched', data});
  } catch (error) {
    badResponse(error, res);
  }
}

exports.getTournaments = async (req, res, next) => {
  try {
    const data = await dbApi.getTournaments();
    res.status(200).json({status: 200, message: 'Tournaments fetched', data});
  } catch (error) {
    badResponse(error, res);
  }
}

exports.allTournamentInfo = async (req, res, next) => {
  const {tournament_id} = req.params;
  try {
    const ranking = await dbApi.tournamentRanking(tournament_id);
    let info = await dbApi.tournamentInfo(tournament_id);
    info.next_match = format(info.next_match, 'MM/DD/YYYY');
    const data = {
      ranking,
      info
    }
    res.status(200).json({status: 200, message: 'All tournament info fetched', data});
  } catch (error) {
    badResponse(error, res);
  }
}


function badResponse(error, res) {
  console.log(error);
  res.status(500).json({error});
}

exports.createTournament = async (req, res, next) => {
  const {type, country, tournament_name} = req.body;
  try{
    await dbApi.newTournament(type, country, tournament_name);
    res.status(201).json({status:201, message: 'tournament created'});
  }catch (e){
    badResponse(e, res);
  }
}

exports.deleteTournament = async (req, res, next) => {
  const {tournament_id} = req.body;
  try{
    await dbApi.deleteTournament(tournament_id);
    res.status(200).json({status:200, message: 'tournament deleted'});
  }catch (e){
    badResponse(e, res);
  }
}

exports.createMatch = async (req, res, next) => {
  const {tournamentId, group_id, match_date, team1, team2} = req.body;
  try{
    const matchId = await dbApi.createMatch(tournamentId, group_id, match_date);
    await dbApi.createMatchParticipants(1, team1, matchId.match_id);
    await dbApi.createMatchParticipants(2, team2, matchId.match_id);
    res.status(201).json({status:201, message: 'match created'});
  }catch (e){
    badResponse (e, res);
  }
}

exports.updateMatch = async (req, res, next) => {
  const {team1Score, team1Id, team2Score, team2Id, matchId, team1Name, team2Name} = req.body;
  try{
    let winner;
    if (team1Score === team2Score){
      winner = 'Empate';
    }else if (team1Score !== team2Score){
      winner = (team1Score > team2Score ? team1Name : team2Name);
    }
    await dbApi.editParticipants(team1Score, matchId, team1Id);
    await dbApi.editParticipants(team2Score, matchId, team2Id);
    await dbApi.updateMatch(winner, matchId);
    res.status(200).json({status:200, message: 'match updated'});
  }catch (e){
    badResponse (e, res);
  }
}

exports.deleteMatch = async (req, res, next) => {
  const {matchId} = req.body;
  try{
    await dbApi.deleteMatch(matchId);
    res.status(200).json({status:200, message: 'match deleted'});
  }catch (e){
    badResponse (e, res);
  }
}

exports.createTeam = async (req, res, next) => {
  const {team_country, team_name, team_desc} = req.body;
  try{
    await dbApi.newTeam(team_country, team_name, null, team_desc);
    res.status(201).json({status:201, message: 'team created'});
  }catch (e){
    badResponse (e, res);
  }
}

exports.updateTeam = async (req, res, next) => {
  const {name, desc, country, teamId} = req.body;
  try{
    await dbApi.editTeam(name, null, Math.floor(Math.random() * 30), desc, country, teamId);
    res.status(200).json({status:200, message: 'team updated'});
  }catch (e){
    badResponse (e, res);
  }
}

exports.deleteTeam = async (req, res, next) => {
  const {teamId} = req.body;
  try{
    await dbApi.deleteMatch(teamId);
    res.status(200).json({status:200, message: 'team deleted'});
  }catch (e){
    badResponse (e, res);
  }
}

