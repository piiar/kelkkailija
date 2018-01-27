import React, { Component } from "react";
import TopBar from "./TopBar";

class ChooseRobot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            price: 0,
            canAfford: true,
            robotTransmitted: false,
            parts: ["TOP", "LEFT", "RIGHT", "BOTTOM"],
            selectedParts: {
                TOP: 0,
                LEFT: 0,
                RIGHT: 0,
                BOTTOM: 0
            },
            availableParts: {
                TOP: [
                    { name: "ai-kill", price: 0 },
                    { name: "ai-bonus", price: 0 },
                    { name: "ai-defence", price: 0 }
                ],
                LEFT: [
                    { name: "lo-left", price: 0 },
                    { name: "mid-left", price: 250 },
                    { name: "hi-left", price: 1000 }
                ],
                RIGHT: [
                    { name: "lo-right", price: 0 },
                    { name: "mid-right", price: 250 },
                    { name: "hi-right", price: 1000 }
                ],
                BOTTOM: [
                    { name: "lo-bottom", price: 0 },
                    { name: "mid-bottom", price: 250 },
                    { name: "hi-bottom", price: 1000 }
                ]
            }
        };
        this.totalPrice = this.totalPrice.bind(this);
        this.rotatePart = this.rotatePart.bind(this);
        this.transmitRobot = this.transmitRobot.bind(this);
    }

    totalPrice(selectedParts) {
        let totalPrice = 0;
        for (let i = 0; i < this.state.parts.length; i++) {
            let part = this.state.parts[i];
            totalPrice += this.state.availableParts[part][selectedParts[part]].price;
        }
        return totalPrice;
    }

    rotatePart(part) {
        let maxIndex = this.state.availableParts[part].length - 1;
        let selectedPartsCopy = { ...this.state.selectedParts };
        selectedPartsCopy[part]++;
        if (selectedPartsCopy[part] > maxIndex) {
            selectedPartsCopy[part] = 0;
        }

        let newPrice = this.totalPrice(selectedPartsCopy);
        let canAfford = newPrice > this.props.budget ? false : true;
        this.setState({
            selectedParts: selectedPartsCopy,
            price: newPrice,
            canAfford: canAfford
        });
    }

    transmitRobot() {
        this.setState({
            robotTransmitted: true
        });
        this.props.transmitRobot(this.state.selectedParts);
    }

    render() {
        let loadingDots = (
            <span>
                {" "}
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
        );
        return (
            <div className="flex1 flex-align-center flex-justify-stretch flex-col">
                <TopBar name={this.props.name} points={this.props.points} />
                <div className="flex-align-center flex1 flex-col">
                    <div className="choose-robot-title margin-bottom10">
                        <span>Assemble your robot</span>
                    </div>
                    <div className="choose-robot-title margin-bottom10">
                        <span>Budget: {this.props.budget - this.state.price} $</span>
                        {this.state.canAfford ? null : <span>!!!TOO EXPENSIVE!!!</span>}
                    </div>
                    <div className="robot-top margin-bottom10 flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].name}
                            </div>
                            <div className="selected-part-price">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].price}$
                            </div>
                        </div>
                        {this.state.robotTransmitted ? null : (
                            <button
                                className="swap-button"
                                onClick={() => {
                                    this.rotatePart("TOP");
                                }}
                            />
                        )}
                    </div>
                    <div className="robot-left margin-bottom10 flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.LEFT[this.state.selectedParts.LEFT].name}
                            </div>
                            <div className="selected-part-price">
                                {
                                    this.state.availableParts.LEFT[this.state.selectedParts.LEFT]
                                        .price
                                }$
                            </div>
                        </div>
                        {this.state.robotTransmitted ? null : (
                            <button
                                className="swap-button"
                                onClick={() => {
                                    this.rotatePart("LEFT");
                                }}
                            />
                        )}
                    </div>
                    <div className="robot-right margin-bottom10 flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {
                                    this.state.availableParts.RIGHT[this.state.selectedParts.RIGHT]
                                        .name
                                }
                            </div>
                            <div className="selected-part-price">
                                {
                                    this.state.availableParts.RIGHT[this.state.selectedParts.RIGHT]
                                        .price
                                }$
                            </div>
                        </div>
                        {this.state.robotTransmitted ? null : (
                            <button
                                className="swap-button"
                                onClick={() => {
                                    this.rotatePart("RIGHT");
                                }}
                            />
                        )}
                    </div>
                    <div className="robot-bottom margin-bottom10 flex-row flex-align-center">
                        <div className="part-left">
                            <div className="selected-part">
                                {
                                    this.state.availableParts.BOTTOM[
                                        this.state.selectedParts.BOTTOM
                                    ].name
                                }
                            </div>
                            <div className="selected-part-price">
                                {
                                    this.state.availableParts.BOTTOM[
                                        this.state.selectedParts.BOTTOM
                                    ].price
                                }$
                            </div>
                        </div>
                        {this.state.robotTransmitted ? null : (
                            <button
                                className="swap-button"
                                onClick={() => {
                                    this.rotatePart("BOTTOM");
                                }}
                            />
                        )}
                    </div>
                    {this.state.robotTransmitted ? (<span className="loading big">{loadingDots}</span>) : null}
                </div>
                {this.state.robotTransmitted ? (
                    <span className="button-container">
                        Robot transmitted! Waiting for launch
                    </span>
                ) : (
                    <button
                        className="button-container start-button"
                        disabled={!this.state.canAfford}
                        onClick={this.transmitRobot}
                    />
                )}
            </div>
        );
    }
}

export default ChooseRobot;
