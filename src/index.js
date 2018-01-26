import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Step1 from "./Step1";
import { Route, BrowserRouter  } from 'react-router-dom'
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <BrowserRouter >
        <div>
            <Route exact path="/" component={App} />
            <Route path="/step1" component={Step1} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
