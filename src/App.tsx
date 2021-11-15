import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
// import Page from "./pages/Page";
import Login from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Dashboard from "./pages/Dashboard";
import history from "./history";
import ProtectedRoute from "./components/ProtectedComponent";
import BottomNav from "./components/BottomNav";
import BuyAirtime from "./pages/BuyAirtime";
import BuyData from "./pages/BuyData";
import CableTv from "./pages/CableTv";
import Utility from "./pages/Utility";
import Menu from "./pages/Menu";
import TransactionPage from "./pages/Transactions";
import AddMoney from "./pages/AddMoney";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import EmailVerification from "./pages/EmailVerification";
import ResetPasswordVerification from "./pages/ResetPasswordVerification";
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter history={history}>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/verification" exact={true}>
              <EmailVerification />
            </Route>
            <Route path="/verify-reset" exact={true}>
              <ResetPasswordVerification />
            </Route>
            <Route path="/forgot" exact={true}>
              <ForgotPassword />
            </Route>
            <Route path="/signup" exact={true}>
              <Register />
            </Route>
            {/* protected Routes */}
            <Route path="/bvn-verification" exact={true}>
              <Verification />
            </Route>
            <ProtectedRoute
              path="/dashboard"
              exact={true}
              component={Dashboard}
            />
            <ProtectedRoute
              path="/buy-airtime"
              exact={true}
              component={BuyAirtime}
            />
            <ProtectedRoute path="/buy-data" exact={true} component={BuyData} />
            <ProtectedRoute
              path="/buy-cable"
              exact={true}
              component={CableTv}
            />
            <ProtectedRoute path="/utility" exact={true} component={Utility} />
            <ProtectedRoute path="/menu" exact={true} component={Menu} />
            <ProtectedRoute
              path="/transactions"
              exact={true}
              component={TransactionPage}
            />
            <ProtectedRoute
              path="/add-money"
              exact={true}
              component={AddMoney}
            />

            <ProtectedRoute
              path="/update-profile"
              exact={true}
              component={UpdateProfile}
            />
            <ProtectedRoute
              path="/change-password"
              exact={true}
              component={UpdatePassword}
            />

            <ProtectedRoute path="/profile" exact={true} component={Profile} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
