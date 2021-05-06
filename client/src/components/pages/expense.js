/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import taskAPI from "../APIs/taskAPI";
import { withCookies, Cookies } from "react-cookie";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./expense.css";

function Todo() {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [cost, setCost] = useState("");
  const [user, setUser] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const getUserInfo = async () => {
        const token = readCookie("token");
        try {
          const res = await axios.get(
            "/api/v1/users/infor",
            {
              headers: { auth_token: token },
            }
          );
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    }
    getAllExpenses();
    return () => (mounted = false);
  }, [cost, expenses]);

  const getAllExpenses = async () => {
    const token = readCookie("token");
    try {
      const res = await axios.get("/api/v1/expense", {
        headers: { auth_token: token },
      });
      setExpenses(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const createExpense = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await taskAPI.editExpense(id, expense, cost);
        alert(res.data.msg);
      } else {
        const res = await taskAPI.createExpense(expense, user, cost);
        alert(res.data.msg);
      }
      setOnEdit(false);
    } catch (err) {
      alert(err.data.msg);
    }
  };

  const readCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const editExpense = async (id, expense, cost) => {
    setID(id);
    setExpense(expense);
    setCost(cost);
    setOnEdit(true);
  };

  const deleteExpense = async (id) => {
    try {
      const res = await taskAPI.deleteExpenseById(id);
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div id="create_to_do_page" className="">
      <div id="tasks_container">
        <form
          onSubmit={(e) => {
            createExpense(e);
          }}
        >
          {/* <h1 htmlFor="name">{user.username}</h1> */}
          <h1 htmlFor="task">Tasks</h1>
          <input
            type="text"
            name="task"
            value={expense}
            required
            onChange={(e) => setExpense(e.target.value)}
          />
          <h1 htmlFor="task">Cost</h1>
          <input
            type="number"
            name="cost"
            value={cost}
            required
            onChange={(e) => setCost(e.target.value)}
          />

          <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>

        {expenses.map((expense) => (
          <div
            id="todocontainer"
            className="text-dark text-center p-1 bg-light"
            key={expense._id}
          >
            <div className="bg-gray-200 rounded-lg pl-2 pt-2 pb-2 container">
              <p className="">
                Date: {moment(expense.createdAt).format("YYYY-MM-DD")}
              </p>
              <p className="">Item: {expense.task}</p>
              <p className="">Cost: ${expense.cost}</p>
              <p className="">
                Edited on: {moment(expense.updatedAt).format("YYYY-MM-DD")}
              </p>
            </div>
            <button
              className="btn btn-secondary"
              onClick={(e) =>
                editExpense(expense._id, expense.task, expense.cost)
              }
            >
              Edit
            </button>

            <button
              className="btn btn-danger"
              onClick={(e) => deleteExpense(expense._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withRouter(withCookies(Todo));
