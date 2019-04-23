const dbApi = require('../../helpers/database/Api/dbApi');

exports.postBet = async (req, res) => {
  try {
    const { matchId, betPayment, betOdd, team1Score, team2Score } = req.body;
    data = await dbApi.postBet(matchId, req.user.id, betPayment, betOdd, team1Score, team2Score);
    console.log(data);
    res.json({status: 201, message: 'apuesta creada', data});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'hubo un error creando la apuesta'});
  }
}

exports.getBets = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}