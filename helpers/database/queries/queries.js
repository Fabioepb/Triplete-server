const preparedStatement = require('pg-promise').PreparedStatement;
const queries = {
  findUser: new preparedStatement('find-user', 'select * from triplete.users where users_username = $1'),
  signUp: new preparedStatement('login-user', 
  'insert into triplete.users (users_username, users_name, users_password, users_email, type_users_id) values($1, $2, $3, $4, 2)'),
  getTeams: new preparedStatement('get-teams', 
  'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id;'),
  getTeamsByName: new preparedStatement('get-teams-byName',
   'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id where te.teams_name ilike $1'),
  getMatchs: new preparedStatement('get-matchs',
  'select mat.match_id, match_played, match_winner, match_date, te.teams_name, ts.status_description, matem.team_score from triplete.matches mat right join triplete.matches_teams matem on mat.match_id = matem.match_id left join triplete.team_status ts on matem.team_status_id = ts.team_status_id left join triplete.teams te on matem.teams_id = te.teams_id where mat.tournaments_id = $1 order by mat.match_id, mat.match_played ;'),
  getTournaments: new preparedStatement('get-tournaments', 'select tournaments_id, country_name, tournaments_name from triplete.tournaments tor inner join triplete.country co on tor.country_id = co.country_id;'),
  tournamentRanking: new preparedStatement('tournament-ranking',
   'select teams_name, games, goals, draw, lost, points, last, win from triplete.tournament_ranking tr inner join triplete.teams te on tr.teams_id = te.teams_id where tr.tournament_id = $1 order by points desc;'),
   tournamentInfo: new preparedStatement('tournament-info', 
   `select count(mat.match_id)/3 as teams, 
   (select match_date from triplete.matches where tournaments_id = $1 order by match_date desc limit 1) as next_match,
   (select count(mat.match_id)
   from triplete.tournaments tr
   inner join triplete.matches mat on tr.tournaments_id = mat.tournaments_id
   inner join triplete.matches_teams matem on mat.match_id = matem.match_id where tr.tournaments_id= $1 and mat.match_played = true) as matches_played
   from triplete.tournaments tr
   inner join triplete.matches mat on tr.tournaments_id = mat.tournaments_id
   inner join triplete.matches_teams matem on mat.match_id = matem.match_id where tr.tournaments_id= $1;`)
   
  
}

module.exports = queries;