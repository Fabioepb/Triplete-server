const preparedStatement = require('pg-promise').PreparedStatement;
const queries = {
  findUser: new preparedStatement('find-user', 'select * from triplete.users where users_username = $1'),
  signUp: new preparedStatement('login-user', 
  'insert into triplete.users (users_username, users_name, users_password, users_email, type_users_id) values($1, $2, $3, $4, 1)'),
  getTeams: new preparedStatement('get-teams', 
  'select teams_id ,country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id;'),
  getTeamsByName: new preparedStatement('get-teams-byName',
   'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id where te.teams_name ilike $1'),
   getTeamsById: new preparedStatement('get-teams-byId',
   'select country_name, teams_name, teams_url, teams_average, team_description from triplete.teams te left join triplete.country co on te.country_id = co.country_id where te.teams_id = $1'),
  getMatchs: new preparedStatement('get-matchs',
  'select mat.match_id, match_played, match_winner, match_date, te.teams_name, ts.status_description, matem.team_score from triplete.matches mat right join triplete.matches_teams matem on mat.match_id = matem.match_id left join triplete.team_status ts on matem.team_status_id = ts.team_status_id left join triplete.teams te on matem.teams_id = te.teams_id where mat.tournaments_id = $1 order by  mat.match_played asc, mat.match_id desc;'),
  getTournaments: new preparedStatement('get-tournaments', 'select tournaments_id, country_name, tournaments_name from triplete.tournaments tor inner join triplete.country co on tor.country_id = co.country_id;'),
  getAllCountrys: new preparedStatement('get-all-countrys', 'select * from triplete.country'),

  tournamentRanking: new preparedStatement('tournament-ranking',
   'select teams_name, games, goals, draw, lost, points, last, win from triplete.tournament_ranking tr inner join triplete.teams te on tr.teams_id = te.teams_id where tr.tournament_id = $1 order by points desc;'),
   tournamentInfo: new preparedStatement('tournament-info', 
   `select count(mat.match_id)/3 as teams, 
   (select match_date from triplete.matches where tournaments_id = $1 order by match_date desc limit 1) as next_match,
   (select count(mat.match_id)/2
   from triplete.tournaments tr
   inner join triplete.matches mat on tr.tournaments_id = mat.tournaments_id
   inner join triplete.matches_teams matem on mat.match_id = matem.match_id where tr.tournaments_id= $1 and mat.match_played = true) as matches_played
   from triplete.tournaments tr
   inner join triplete.matches mat on tr.tournaments_id = mat.tournaments_id
   inner join triplete.matches_teams matem on mat.match_id = matem.match_id where tr.tournaments_id= $1;`),
   putProfile: new preparedStatement('pu-profile', `update triplete.users set users_name = $1, users_email = $2, users_credit_card = $3, users_bank_account = $4 where users_id = $5`),
   getProfileUser: new preparedStatement('get-profile', 'SELECT * from triplete.users WHERE users_id = $1'),
   getProfileBets: new preparedStatement('get-profile-bets', 'SELECT * FROM triplete.bet_detail WHERE users_id = $1 ORDER BY bet_creation_time DESC limit 10'),
   postBet: new preparedStatement('post-bet', `insert into triplete.bet_detail (match_id, users_id, bet_payment, bet_odd, team1_score, team2_score, bet_creation_time) values($1, $2, $3, $4, $5, $6, now()) returning bet_id`),
   getBets: new preparedStatement('get-bet', `select * from triplete.bet_detail where users_id = $1`),
   deleteBet: new preparedStatement('get-bet', 'delete from triplete.bet_detail where users_id = $1'),
   createTournament: new preparedStatement('new-tournament', 'INSERT INTO triplete.tournaments (type_tournament_id, country_id, tournaments_name) VALUES ($1, $2, $3)'),
   deleteTournament: new preparedStatement('dlt-tournament', 'DELETE FROM triplete.tournaments WHERE tournaments_id= $1'),
   createTeam: new preparedStatement('new-team', 'insert into triplete.teams (country_id, teams_name, teams_url, team_description) VALUES ($1, $2, $3, $4)'),
   updateTeam: new preparedStatement('updt-team', 'update triplete.teams SET teams_name = $1, teams_url = $2, teams_average = $3, team_description = $4, country_id = $5 WHERE teams_id = $6'),
   deleteTeam: new preparedStatement('dlt-team','delete from triplete.teams where teams_id = $1'),
   createMatch: new preparedStatement('new-match','insert into triplete.matches (tournaments_id, match_played, rounds_id, group_id, type_match_id, match_date) VALUES ($1, FALSE, 1, $2, 1, $3) returning match_id'),
   updateMatch: new preparedStatement('updt-match','update triplete.matches set match_played = $1, match_winner = $2 where match_id = $3'),
   deleteMatch: new preparedStatement('dlt-match', 'delete from triplete.matches where match_id = $1'),
   createMatchParticipants: new preparedStatement('new-match-teams','insert into triplete.matches_teams (team_status_id, teams_id, match_id) Values ($1, $2, $3);'),
   getMatchParticipants: new preparedStatement('get-match-teams', 'select * from triplete.matches_teams where match_id = $1'),
   editMatchParticipants: new preparedStatement('edit-match-teams','update triplete.matches_teams set team_score = $1 where match_id = $2 AND teams_id = $3'),
   getBetsInRange: new preparedStatement('bets-on-range','select * from triplete.bet_detail bt inner join triplete.users us on us.users_id = bt.users_id inner join triplete.matches mt on bt.match_id = mt.match_id WHERE bt.bet_creation_time >= $1'),
   getBetsInDay: new preparedStatement('bets-on-day','select * from triplete.bet_detail bt inner join triplete.users us on us.users_id = bt.users_id inner join triplete.matches mt on bt.match_id = mt.match_id WHERE bt.bet_creation_time = $1'),
   getAllBets: new preparedStatement('all-bets', 'select * from triplete.bet_detail bt inner join triplete.users us on us.users_id = bt.users_id inner join triplete.matches mt on bt.match_id = mt.match_id ORDER BY bt.bet_creation_time DESC limit 10')
}

module.exports = queries;