const { all } = require('axios');
const expModel = require('../models/expenseDefine')



exports.addExpense = async (req, res, next) => {
    try {
        // console.log(req.body.amount)
        // console.log(req.body.description)
        // console.log(req.body.category)



      const userData =  await expModel.create({
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category
        })

        res.json(userData);
    } catch (e) { console.log(e) }


}



// router.get('/get-expense',
exports.getExpense = async(req,res,next)=> {
    try{

        const allUsers = await expModel.findAll();

       res.json(allUsers)
    }catch(e){
        console.log(e)
    }
}



// router.delete('/del-expense/:id',
exports.delExpense = async(req,res,next)=> {

    const expID = req.params.id;
    
    try{
        await expModel.destroy({where :{id :expID}})
        res.status(200).send()
    }catch(e){

    }
};


