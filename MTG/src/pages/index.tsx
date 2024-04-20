import React from "react";
import { withRouter, RouteComponentProps, Switch, Route } from "react-router-dom";

import Main from "./main";
import Header from "./header";
import Reviews from "../components/reviews";

interface Props extends RouteComponentProps { }

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <Header />

        <Main>
          <Switch>
            <Route exact path="/" component={Reviews} />
            <Route path="/:id" component={Reviews} />
          </Switch>
        </Main>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
