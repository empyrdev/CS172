import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./Login";
import RegisterPage from "./RegisterPage";
import HomePage from "./HomePage";
import SearchResultPage from "./SearchResultPage";
import CartPage from "./CartPage";
import ItemByCategory from "./ItemByCategory";
import ItemByItemID from "./ItemByItemID";
import Categories from "./Categories";
import PaymentPage from "./PaymentPage";
import HistoryPage from "./HistoryPage";
import ProfileViewPage from "./ProfileViewPage";
import ProfileEditPage from "./ProfileEditPage";
import { PrivateRoute } from "./PrivateRoute";

function Routing({ appProps }) {
  const signedOutRoutes = [
    { path: "/login", C: LoginPage },
    { path: "/register", C: RegisterPage }
  ];
  const signedInRoutes = [
    { path: "/", C: HomePage },
    { path: "/search", C: SearchResultPage },
    { path: "/cart", C: CartPage },
    { path: "/category/:id", C: ItemByCategory },
    { path: "/item/:id", C: ItemByItemID },
    { path: "/categories", C: Categories },
    { path: "/payment", C: PaymentPage },
    { path: "/history", C: HistoryPage },
    { path: "/profile-view", C: ProfileViewPage },
    { path: "/profile-edit", C: ProfileEditPage},
  ];

  return (
    <div>
      <Switch>
        {signedInRoutes.map((route) => {
          return (
            <PrivateRoute exact path={route.path}
              appProps={{ allowed: appProps.authenticated, ...appProps }}
              component={route.C} />
          );
        })}
        {signedOutRoutes.map((x, index) => {
          return (
            <Route key={index} exact path={x.path}
              render={(props) => !appProps.authenticated ? <x.C
                {...appProps} {...props} /> :
                <Route render={() => <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }} />}
                />}
            />
          );
        })}
        <Route render={(props) => <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }} />}
        />} />
      </Switch>
    </div>
  );
}

export default Routing;
