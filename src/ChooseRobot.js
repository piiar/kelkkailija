import React, { Component } from "react";
import TopBar from "./TopBar";

class ChooseRobot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null
        };
    }

    render() {
        return (
            <div className="flex1 flex-align-center flex-justify-center flex-col">
                <TopBar name={this.props.name} points={this.props.points} />
                <div>
                    ChooseRobot
                </div>
            </div>
        );
    }
}

export default ChooseRobot;
