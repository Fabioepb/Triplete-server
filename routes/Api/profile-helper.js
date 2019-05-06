const dbApi = require('../../helpers/database/Api/dbApi');


exports.updateUser = async (req, res) => {
  try {
    const {name, email, creditCard, creditCard} = req.body;
    console.log(req.user);
    await dbApi.updateUser(req.user.id, name, email, creditCard, bankAccount);
    res.json({status: 200, message: 'user updated'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'error'})
  }
}

exports.getUserData = async (req, res) => {
	try{
		let data = {};
		console.log(req.user.id)
		data.user = await dbApi.getUserData(req.user.id);
		data.bets = await dbApi.getProfileBets(req.user.id);
		data.won = 0;
		data.lose = 0;
		data.streak = 0;
		data.longest_streak = 0;
		data.played = data.bets.length;
		await Promise.all(data.bets.map(async el => {
			el.participants = await dbApi.getMatchParticipants(el.match_id);
			if (el.team1_score === el.participants[0].team_score && el.team2_score === el.participants[1].team_score){
				data.won++;
				data.streak++;
				data.longest_streak++;
			}else{
				data.lose++;
			}
		}));
		res.status(200).json({status:200, data});
	}catch (e){
		console.log(e);
		res.status(500).json({status:500, message: e});
	}
}