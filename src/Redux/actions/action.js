import Axios from "axios";
import toast from "react-hot-toast";
import { Redirect, useHistory } from "react-router";
import history from "../../history";

//enpoint base Url
const baseUrl = "https://paygo.gitit-tech.com";

//login action
export const login = (userData) => {
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
        // toast.success("User details fetched successfully");
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
          payload: response.data,
        });
        // toast.success("Bills fetched successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
};
