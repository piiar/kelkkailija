import React, { Component } from "react";
import TopBar from "./TopBar";

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            availableParts: {
                TOP: [
                    { name: "ai-aggressive", price: 0 },
                    { name: "ai-flanking", price: 0 },
                    { name: "ai-objective", price: 0 }
                ]
            },
            // Default selected part:
            selectedParts: props.selectedParts
        };

        this.rotatePart = this.rotatePart.bind(this);
        this.transmitRobot = this.transmitRobot.bind(this);
    }

    rotatePart(part) {
        let maxIndex = this.state.availableParts[part].length - 1;
        let selectedPartsCopy = { ...this.state.selectedParts };
        selectedPartsCopy[part]++;
        if (selectedPartsCopy[part] > maxIndex) {
            selectedPartsCopy[part] = 0;
        }

        if (this.state.transmitTimeout) {
            clearTimeout(this.state.transmitTimeout);
        }

        let timeout = setTimeout(this.transmitRobot, 2000);

        this.setState({
            selectedParts: selectedPartsCopy,
            transmitTimeout: timeout
        });
    }

    transmitRobot() {
        this.props.transmitRobot(this.state.selectedParts);
    }

    render() {
        return (
            <div className="flex1 flex-align-center flex-justify-center flex-col">
                <TopBar name={this.props.name} points={this.props.points} />
                <div className="flex-align-center flex1 flex-col">
                    <div className="margin-bottom10">You are in game!</div>
                    <div className="margin-bottom10">You can swap your AI mode:</div>
                    <div className="robot-top flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].name}
                            </div>
                        </div>
                        <button
                            className="swap-button"
                            onClick={() => {
                                this.rotatePart("TOP");
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Actions;
