import Axios from "axios";
import toast from "react-hot-toast";
import { Redirect, useHistory } from "react-router";
import history from "../../history";

//enpoint base Url
const baseUrl = "https://paygo.gitit-tech.com";

//login action
export const login = (userData) => {
  console.log(userData);
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/auth",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: userData,
    };

    Axios(options)
      .then((response) => {
        window.localStorage.setItem("accessToken", response.data.authorization);
        history.push("/dashboard");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        toast.error("Invalid username and password");
        dispatch({ type: "NOTLOADING" });
      });
  };
};

//fetch user complete details action
export const fetchUser = () => {
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/users/payment-methods",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
    };

    Axios(options)
      .then((response) => {
        dispatch({
          type: "USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
};

//fetch airtime
export const fetchBills = () => {
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/bills",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
    };

    Axios(options)
      .then((response) => {
        dispatch({
          type: "BILLS",
          payload: response.data.data,
        });
        // toast.success("Bills fetched successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
};
//paybills action
export const payBills = ({ transactValues, type }) => {
  console.log(transactValues);
  const et = {
    recurring: false,
    intervalInDays: 0,
    pin: transactValues.pin,
    billDetails: {
      country: "NG",
      customer: transactValues.phone,
      amount: transactValues.amount,
      type: type,
    },
  };

  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/bills",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
      data: et,
    };

    Axios(options)
      .then((response) => {
        toast.success("Succesful");
        history.push("/dashboard");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        toast.error("Something went wrong, check your balance");
        history.push("/dashboard");
        dispatch({ type: "NOTLOADING" });
      });
  };
};
