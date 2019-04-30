const express = require('express');
const router = express.Router();
const api = require('./Api/Api/api.helper');

router.route('/Teams').get(api.getTeams).post(api.createTeam).put(api.updateTeam).delete(api.deleteTeam);
router.route('/Teams/:teams_name').get(api.getTeamsByName);
router.route('/Match').post(api.createMatch).put(api.updateMatch).delete(api.deleteMatch);
router.route('/Matchs/:tournament_id').get(api.getMatch);
router.route('/Tournaments').get(api.getTournaments).post(api.createTournament).delete(api.deleteTournament);
router.route('/Tournament/:tournament_id').get(api.allTournamentInfo);

module.exports = router;