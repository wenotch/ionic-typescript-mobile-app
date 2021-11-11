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
            <Route path="/buy-airtime" exact={true}>
              <BuyAirtime />
            </Route>
            <Route path="/buy-data" exact={true}>
              <BuyData />
            </Route>

            <Route path="/buy-cable" exact={true}>
              <CableTv />
            </Route>

            <Route path="/utility" exact={true}>
              <Utility />
            </Route>

            <Route path="/menu" exact={true}>
              <Menu />
            </Route>

            <Route path="/forgot" exact={true}>
              <ForgotPassword />
            </Route>

            <Route path="/signup" exact={true}>
              <Register />
            </Route>

            <Route path="/transactions" exact={true}>
              <TransactionPage />
            </Route>

            <Route path="/profile" exact={true}>
              <Profile />
            </Route>

            <Route path="/add-money" exact={true}>
              <AddMoney />
            </Route>

            <Route path="/bvn-verification" exact={true}>
              <Verification />
            </Route>

            <ProtectedRoute
              path="/dashboard"
              exact={true}
              component={Dashboard}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
