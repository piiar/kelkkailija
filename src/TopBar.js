import React, { Component } from "react";

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null
        };
    }

    render() {
        return (
            <div>Name: {this.props.name}, Points: {this.props.points}</div>
        );
    }
}

export default TopBar;
