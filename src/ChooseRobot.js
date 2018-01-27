import React, { Component } from "react";
import TopBar from "./TopBar";

class ChooseRobot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: null,
            price: 0,
            parts: ["TOP", "LEFT", "RIGHT", "BOTTOM"],
            selectedParts: {
                TOP: 0,
                LEFT: 0,
                RIGHT: 0,
                BOTTOM: 0
            },
            availableParts: {
                TOP: [
                    { name: "lo-head", price: 0 },
                    { name: "mid-head", price: 250 },
                    { name: "hi-head", price: 1000 }
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
    }

    totalPrice() {
        let totalPrice = 0;
        for (let i = 0; i < this.state.parts.length; i++) {
            let part = this.state.parts[i];
            totalPrice += this.state.availableParts[part][this.state.selectedParts[part]].price;
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

        this.setState({
            selectedParts: selectedPartsCopy
        });

        let newPrice = this.totalPrice();
        this.setState({
            price: newPrice
        });
    }

    render() {
        return (
            <div className="flex1 flex-align-center flex-justify-stretch flex-col">
                <TopBar name={this.props.name} points={this.props.points} />
                <div className="flex1 flex-col">
                    <div className="choose-robot-title">
                        <span>Assemble your robot</span>
                    </div>
                    <div className="choose-robot-title">
                        <span>
                            Budget: {this.props.budget - this.state.price} $
                        </span>
                    </div>
                    <div className="robot-top flex-row">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].name}
                            </div>
                            <div className="selected-part-price">
                                {this.state.availableParts.TOP[this.state.selectedParts.TOP].price}$
                            </div>
                        </div>
                        <button className="swap-button"
                            onClick={() => {
                                this.rotatePart("TOP");
                            }}
                        ></button>
                    </div>
                    <div className="robot-left flex-row">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.LEFT[this.state.selectedParts.LEFT].name}
                            </div>
                            <div className="selected-part-price">
                                {this.state.availableParts.LEFT[this.state.selectedParts.LEFT].price}$
                            </div>
                        </div>
                        <button className="swap-button"
                            onClick={() => {
                                this.rotatePart("LEFT");
                            }}
                        ></button>
                    </div>
                    <div className="robot-right flex-row">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.RIGHT[this.state.selectedParts.RIGHT].name}
                            </div>
                            <div className="selected-part-price">
                                {this.state.availableParts.RIGHT[this.state.selectedParts.RIGHT].price}$
                            </div>
                        </div>
                        <button className="swap-button"
                            onClick={() => {
                                this.rotatePart("RIGHT");
                            }}
                        ></button>
                    </div>
                    <div className="robot-bottom flex-row">
                        <div className="part-left">
                            <div className="selected-part">
                                {this.state.availableParts.BOTTOM[this.state.selectedParts.BOTTOM].name}
                            </div>
                            <div className="selected-part-price">
                                {
                                    this.state.availableParts.BOTTOM[this.state.selectedParts.BOTTOM]
                                        .price
                                }$
                            </div>
                        </div>
                        <button className="swap-button"
                            onClick={() => {
                                this.rotatePart("BOTTOM");
                            }}
                        ></button>
                    </div>
                </div>
                <button
                    className="button-container start-button"
                    disabled={!this.state.loaded}
                    onClick={this.startGame}
                />
            </div>
        );
    }
}

export default ChooseRobot;
