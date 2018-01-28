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
            <div style={{ background: this.props.color }} className="top-bar flex-row">
                <div />
                {/* Empty div for consistency */}
                <div className="name flex1 flex-justify-center">{this.props.name}</div>
                <div className="points">{this.props.points}</div>
            </div>
        );
    }
}

export default TopBar;
