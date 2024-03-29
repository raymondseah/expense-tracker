const expenseModel = require("../models/expenseModel");

const expenseControllers = {
  createExpense: async (req, res) => {
    expenseModel.create({
      user_id: req.body.userid,
      task: req.body.expense,
      cost:req.body.cost,
    })
      .then((createProductResult) => {
        console.log("created");
        res.status(200);
        res.json({
          msg: "task created successfully",
        });
      })
      .catch((err) => {
        res.statueCode = 409;
        res.json({
          msg: "unable to create due to unexpected error",
        });
      });
  },
  getAllExpense: async (req, res) => {
    let id = res.locals.jwtData.id;
    expenseModel.find({
      user_id: id,
    })
      .then((result) => {
        res.statusCode = 200;
        res.json({
          results: result,
          success: true,
          msg: "Found all current logged in user task",
        });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.json({
          success: false,
          msg: "Unable to login due to unexpected error",
        });
      });
  },
  deleteExpenseById: async (req, res) => {
    try {
      await expenseModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Task" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateExpenseById: async (req, res) => {
    expenseModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        task: req.body.task,
        cost:req.body.cost
      }
    )
      .then((result) => {
        res.json({ msg: "edit successful" });
      })
      .catch((err) => {
        res.json(err);
      });
  }
};

module.exports = expenseControllers;
