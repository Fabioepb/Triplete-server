const preparedStatement = require('pg-promise').PreparedStatement;
const queries = {
  findUser: new preparedStatement('find-user', 'select * from users where users_username = $1'),
  signUp: new preparedStatement('login-user', 
  'insert into users (users_username, users_name, users_password, users_email, type_users_id) values($1, $2, $3, $4, 2)'),
  getTeams: new preparedStatement('get-teams', 
  'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id;'),
  getTeamsByName: new preparedStatement('get-teams-byName',
   'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id where te.teams_name ilike $1'),
  getMatchs: new preparedStatement('get-matchs',
  'select mat.match_id, match_played, match_winner, match_date, te.teams_name, ts.status_description, matem.team_score from triplete.matches mat right join triplete.matches_teams matem on mat.match_id = matem.match_id left join triplete.team_status ts on matem.team_status_id = ts.team_status_id left join triplete.teams te on matem.teams_id = te.teams_id where mat.tournaments_id = $1 order by mat.match_id, mat.match_played ;'),
  
}

module.exports = queries;