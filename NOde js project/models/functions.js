const usersModel = require('../models/dbDefine');
const passModel = require('../models/forgotpass')






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

    return final.userid;
    // }

}

exports.userID = userID;