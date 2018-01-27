import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, BrowserRouter  } from 'react-router-dom'
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <BrowserRouter >
        <div>
            <Route exact path="/" component={App} />
            {/* <Route path="/ChooseRobot" component={ChooseRobot} /> */}
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
