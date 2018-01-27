import React, { Component } from "react";
import TopBar from "./TopBar";

class Actions extends Component {
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
                <div className="flex1 flex-col">
                    <div>You are in game!</div>
                    <div>Your current AI mode is</div>
                    <div>{this.props.aiMode}</div>
                    <button class="swap-button"></button>
                </div>
            </div>
        );
    }
}

export default Actions;
