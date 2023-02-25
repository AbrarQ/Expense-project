const usersModel = require('../models/dbDefine');
const passModel = require('../models/forgotpass')
const expModel = require('../models/expenseDefine')





const userID = async function fetchUserID(uuid) {
    console.log("Fetching user Id, step-2")
    const UUID = `${uuid}`;

    const allData = await passModel.findOne({ where: { uuid: UUID } })
        .catch(async (err) => res.status(500).json({ err }))
    const check = JSON.stringify(allData);
    const final = JSON.parse(check)
    // if(final == null){
    //     return final
    // } else {

    return final;
    // }

}

exports.userID = userID;


const getExpense = async function(userid){

    try{
        const exp = await expModel.findAll({ where: { userloginId: userid } })
    
        return JSON.stringify(exp);
    } catch (e){
        console.log(e)
    }
   

}

exports.getExpense = getExpense;


const getLink = async function fetchUserID(uuid) {
    console.log("Fetching user Id, step-2")
    const UUID = `${uuid}`;

    const allData = await passModel.findOne({ where: { uuid: UUID } })
        .catch(async (err) => res.status(500).json({ err }))
    const check = JSON.stringify(allData);
    const final = JSON.parse(check)
    // if(final == null){
    //     return final
    // } else {

    return final;
    // }

}

exports.userID = userID;