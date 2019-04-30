const dbApi = require('../../helpers/database/Api/dbApi');

exports.postBet = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.user.id)
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
    const range  = req.params.range;
    const  date = req.params.date;

    let data;
    if (range === 'day'){
      data = await dbApi.getBetsByDay(date);
    }else if (range === 'range'){
      data = await dbApi.getBetsByRange(date);
    }
    await Promise.all(data.map(async el => {
      el.participants = await dbApi.getMatchParticipants(el.match_id);
    }));
    res.json({status:200, data});
  } catch (error) {
    
  }
}

exports.getAllBets = async (req, res) => {
  try{
    const data = await dbApi.getAllBets();
    await Promise.all(data.map(async el => {
      el.participants = await dbApi.getMatchParticipants(el.match_id);
    }));
    res.status(200).json({status:200, data})
  }catch(e){
    console.log(e);
    res.status(500).send({status:500, error: e})
  }
}