import React, { Component } from "react";
import logo from "./logo.svg";

class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null
        };
    }

    render() {
        return (
            <div className="App">
                Step1
            </div>
        );
    }
}

export default Step1;
