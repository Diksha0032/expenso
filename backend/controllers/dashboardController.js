const Income=require("../models/Income")
const Expense=require("../models/Expense")
const {isValidObjectId,Types}=require("mongoose")

exports.getDashboardData=async(req,res)=>{
  try{

    const userId=req.user.id;
    const userObjectId=new Types.ObjectId(String(userId));

    const totalIncome=await Income.aggregate([
      {$match:{userId:userObjectId}},
      {$group:{_id:null,total:{$sum:"$amount"}}}
    ])

     const totalExpense=await Expense.aggregate([
      {$match:{userId:userObjectId}},
      {$group:{_id:null,total:{$sum:"$amount"}}}
      
    ])

    const last30DaysIncomeTransactions=await Income.find({
      userId:userObjectId,date:{$gte:new Date(Date.now()-30*24*60*60*1000)}
    }).sort({date:-1})

    const incomeLast30Days=last30DaysIncomeTransactions.reduce((sum,transaction)=>sum+transaction.amount,0)

    const last30DaysExpenseTransactions=await Expense.find({
      userId:userObjectId,date:{$gte:new Date(Date.now()-30*24*60*60*1000)}
    }).sort({date:-1})

    const expenseLast30Days=last30DaysExpenseTransactions.reduce((sum,transaction)=>sum+transaction.amount,0)
  
  const[recentIncomes,recentExpenses]=await Promise.all([
    Income.find({userId:userObjectId}).sort({date:-1}).limit(10),
    Expense.find({userId:userObjectId}).sort({date:-1}).limit(10)
  ])

  const lastTransactions=[
    ...recentIncomes.map((tsn)=>({
      ...tsn.toObject(),
      type:"income",
    })),
    ...recentExpenses.map((tsn)=>({
      ...tsn.toObject(),
      type:"expense",
    }))
  ].sort((a,b)=> new Date(b.date)-new Date(a.date)).slice(0,10);
  
  res.json({
    totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
    totalIncome:totalIncome[0]?.total || 0,
    totalExpense:totalExpense[0]?.total || 0,
    last30DaysExpenses:{
      total:expenseLast30Days,
      transactions:last30DaysExpenseTransactions,
    },
    last30DaysIncome:{
      total:incomeLast30Days,
      transactions:last30DaysIncomeTransactions,
    },
    recentTransactions:lastTransactions,
  })
  }catch(error){
    res.status(500).json({message:"Server Error",error})
  }
}