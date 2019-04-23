const dbApi = require('../../helpers/database/Api/dbApi');


exports.updateUser = async (req, res) => {
  try {
    const {name, email, creditCard, bankAccount} = req.body;
    console.log(req.user);
    await dbApi.updateUser(req.user.id, name, email, creditCard, bankAccount);
    res.json({status: 200, message: 'user updated'});
  } catch (error) {
    console.log(error);
    res.json({status: 400, message: 'error maldito'})
  }
}