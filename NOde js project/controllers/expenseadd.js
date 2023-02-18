const { all } = require('axios');
const expModel = require('../models/expenseDefine')




exports.addExpense = async (req, res, next) => {
    try {
        // console.log(req.body.amount)
        // console.log(req.body.description)
        // console.log(req.body.category)

    

       await expModel.create({
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            userloginId : req.user.id
        }).then((data)=> {
            return res.status(200).json(expenses)
        })

        
    } catch (e) { console.log(e) }


}



// router.get('/get-expense',
exports.getExpense = async(req,res,next)=> {
    try{
        await expModel.findAll({where :{userloginId :req.user.id}}).then( expenses =>{
            return res.status(200).json(expenses)})

       
    }catch(e){
        console.log(e)
    }
}



// router.delete('/del-expense/:id',
exports.delExpense = async(req,res,next)=> {

  
    const expID = req.params.id;
    try{
        await expModel.destroy({where :{userloginId :req.user.id, id :expID}}).then( expenses =>{
        return res.status(200).json(expenses)})
    }catch(e){

    }
};


