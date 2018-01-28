import React, { Component } from "react";
import TopBar from "./TopBar";

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            showTopItemSelector: false,
            availableParts: {
                TOP: [
                    { name: "ai-aggressive", real_name: "Aggressive", image: "generic_program", description: "Aim to kill the host player as fast as possible", price: 0 },
                    { name: "ai-flanking", real_name: "Flanking", image: "generic_program", description: "Don't rush in to killing but instead flank the player from behind", price: 0 },
                    { name: "ai-objective", real_name: "Objective", image: "generic_program", description: "Collect as much points and money from the field as possible", price: 0 }
                ],
            },
            // Default selected part:
            selectedParts: props.selectedParts
        };

        this.changeRobot = this.changeRobot.bind(this);
        this.swapWeapon = this.swapWeapon.bind(this);
        this.toggleItemSelector = this.toggleItemSelector.bind(this);
    }

    changeRobot() {
        this.props.changeRobot(this.state.selectedParts);
    }

    toggleItemSelector(item) {
        if (item === 'TOP') {
            this.setState({
                showTopItemSelector: !this.state.showTopItemSelector
            });
        }
    }

    swapWeapon(item, part) {
        let selectedPartsCopy = { ...this.state.selectedParts };

        // get the index of the part
        let idx = this.state.availableParts[item].indexOf(part);
        // update selectedpart index
        selectedPartsCopy[item] = idx;

        if (this.state.transmitTimeout) {
            clearTimeout(this.state.transmitTimeout);
        }

        let timeout = setTimeout(this.changeRobot, 2000);

        this.setState({
            selectedParts: selectedPartsCopy,
            transmitTimeout: timeout
        });
    }

    render() {
        return (
            <div className="flex1 flex-align-center flex-justify-center flex-col">
                {/* TOP item selector */}
                {this.state.showTopItemSelector ? (
                    <div className="item-selector flex-col" onClick={() => this.toggleItemSelector('TOP')}>
                        <span className="item-selector-title">Select your AI mode</span>
                        <div className="flex-col flex1 item-container flex-justify-center flex-align-center">
                            {this.state.availableParts['TOP'].map((part, i) => {
                                const imageUrl = require('./assets/' + part.image + '.png');
                                console.log('part', part, imageUrl);
                                return (
                                    <div key={i} className="weapon-container full-width flex-row" onClick={() => this.swapWeapon('TOP', part)}>
                                        <div className="icon" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                                        <div className="texts flex-col flex1">
                                            <div className="weapon-name full-width">{part.real_name} (${part.price})</div>
                                            <div className="weapon-desc">{part.description}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
                <TopBar
                    color={this.props.selectedColor}
                    name={this.props.name}
                    points={this.props.points}
                />
                <div className="flex-align-center flex1 flex-col">
                    <div className="margin-bottom10">You are in game!</div>
                    <div className="margin-bottom10">Budget: {this.props.budget} $</div>
                    <div className="margin-bottom10">You can swap your AI mode:</div>
                    <div className="robot-top flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].real_name}
                            </div>
                        </div>
                        <button
                            className="swap-button"
                            onClick={() => this.toggleItemSelector('TOP')}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Actions;
