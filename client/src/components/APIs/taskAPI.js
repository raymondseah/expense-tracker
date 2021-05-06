import axios from "axios";
import qs from "qs";

const baseUrl = "/api/v1";
// const baseUrl = "http://localhost:5000/api/v1";
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const ExpensesAPI = {
  deleteExpenseById: (id) => {
    return axiosInstance.delete(`/expense/${id}`);
  },
  createExpense: (expense, user, cost) => {
    return axiosInstance.post(
      "/expense/create",
      qs.stringify({
        expense: expense,
        userid: user._id,
        cost: cost,
      })
    );
  },
  editExpense: (id, task, cost) => {
    return axiosInstance.put(
      `/expense/${id}`,
      qs.stringify({
        task: task,
        cost: cost,
      })
    );
  },
};

export default ExpensesAPI;
