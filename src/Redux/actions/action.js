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

    //to call axios
    const optionstwo = {
      url: baseUrl + "/users/" + userData.email + "/verification",
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    Axios(options)
      .then((response) => {
        console.log(response.data);
        window.localStorage.setItem("accessToken", response.data.authorization);
        history.push("/dashboard");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "Check your inbox to confirm your email address"
        ) {
          Axios(optionstwo)
            .then((response) => {
              history.push("/verification");
              dispatch({ type: "NOTLOADING" });
            })
            .catch((error) => {
              toast.error("Something went wrong");
              dispatch({ type: "NOTLOADING" });
            });
        } else if (
          (error.response.data.message = "Invalid login credentials")
        ) {
          toast.error("Invalid Credentials");
          dispatch({ type: "NOTLOADING" });
        } else {
          toast.error("something went wrong");
          dispatch({ type: "NOTLOADING" });
        }
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
    const state = getState();
    const email = state.user[0].owner.email;
    const user = { ...values, email: email };
    console.log(user);
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
          toast.success("Succesffuly set Pin");
          history.push("/dashboard");
        }
        toast.success("Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
};

//Change Password from within the app
export const resetPassword = (value) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.newUser.email;
    const user = { ...value, email: email };
    console.log(user);
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

//Change Password from outside the app
export const resetPasswordTwo = (value) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.newUser.email;
    const user = { ...value, email: email };
    console.log(user);
    const options = {
      url: baseUrl + "/users/password",
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: user,
    };

    Axios(options)
      .then(async (response) => {
        if (response.status === 200) {
          toast.success("Password Changed");
          history.push("/login");
          dispatch({ type: "NOTLOADING" });
        }
        console.log(response);
      })
      .catch((error) => {
        toast.error(error.message);
        dispatch({ type: "NOTLOADING" });
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

//login action
export const register = (userData) => {
  console.log(userData);
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/users",
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
        history.push("/verification");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        if (error.response.data.status === 6005) {
          toast.error("Email or Phone Number Already Registered");
        } else {
          toast.error("Something went wrong try again");
        }
        dispatch({ type: "NOTLOADING" });
      });
  };
};

//updateUserProfile
export const verifyEmail = (values) => {
  return async (dispatch, getState) => {
    console.log(values);
    const state = getState();
    const email = state.newUser.email;
    const user = { code: values, id: email };
    console.log(user);
    const options = {
      url: baseUrl + "/users/verification",
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: user,
    };

    Axios(options)
      .then(async (response) => {
        toast.success("Verified");
        history.push("/dashboard");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        if (error.response.data.status === 6003) {
          toast.error(
            "you have entered an expired or Invalid OTP. Request again"
          );
        } else if (error.response.data.status === 6002) {
          toast.error("empty input");
        } else {
          toast.error("Something went wrong");
        }
        console.log(error.response.data);
        dispatch({ type: "NOTLOADING" });
      });
  };
};

//forgotPassword
export const forgotPassword = (userData) => {
  console.log(userData);
  return async (dispatch, getState) => {
    const options = {
      url: baseUrl + "/reset-password",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: userData,
    };

    Axios(options)
      .then(async (response) => {
        toast.success("Verifiication code sent");
        history.push("/verify-reset");
        dispatch({ type: "NOTLOADING" });
      })
      .catch((error) => {
        if (error.response.data.status === 6003) {
          toast.error(
            "you have entered an expired or Invalid OTP. Request again"
          );
        } else if (error.response.data.status === 6002) {
          toast.error("empty input");
        } else {
          toast.error("Something went wrong");
        }
        console.log(error.response.data);
        dispatch({ type: "NOTLOADING" });
      });
  };
};

//Change Password
export const setPin = (values) => {
  return async (dispatch, getState) => {
    const state = getState();
    const email = state.user[0].owner.email;
    const user = { ...values, email: email };
    console.log(user);
    const options = {
      url: baseUrl + "/create-pin",
      method: "post",
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
          toast.success(" Pin Set");
          history.push("/dashboard");
        }
        toast.success("Successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
};



//paystack add money
export const addmoneyPaystack = (getTransactionPay) => {
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
