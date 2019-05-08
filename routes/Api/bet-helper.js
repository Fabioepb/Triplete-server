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
      var today = new Date(date);
      var datey = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = datey+' '+time;
      var date2 = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
      var dateTime2 = date2+' '+time;
      data = await dbApi.getBetsByDay(dateTime, dateTime2);
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