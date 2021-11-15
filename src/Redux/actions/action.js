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
export const payBills = ({ transactValues }) => {
  console.log(transactValues.biller_name);
  const et = {
    recurring: false,
    intervalInDays: 0,
    pin: transactValues.pin,
    billDetails: {
      country: "NG",
      customer: transactValues.phone,
      amount: transactValues.amount,
      type: transactValues.biller_name,
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

//updateUserProfile
export const updateProfile = (values) => {
  console.log(values);
  const user = values;
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/users",
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
      data: user,
    };

    Axios(options)
      .then(async (response) => {
        await window.location.reload();
        toast.success("Updated Profile");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        history.push("/dashboard");
      });
  };
};

//Change Password
export const changePassword = (values) => {
  return async (dispatch, getState) => {
    console.log(values);
    const user = values;
    const state = getState();
    const options = {
      url: baseUrl + "/users/password",
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
      data: user,
    };

    Axios(options)
      .then(async (response) => {
        if (response.data.status === 200) {
          toast.success("Password Changed");
          history.push("/dashboard");
        }
        toast.success("Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};

//Change Pin
export const changePin = (values) => {
  return async (dispatch, getState) => {
    console.log(values);
    const user = values;
    const state = getState();
    const options = {
      url: baseUrl + "/users/password",
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        authorization: window.localStorage.getItem("accessToken"),
      },
      data: user,
    };

    Axios(options)
      .then(async (response) => {
        if (response.data.status === 200) {
          toast.success("Password Changed");
          history.push("/dashboard");
        }
        toast.success("Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
