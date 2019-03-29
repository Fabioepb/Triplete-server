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