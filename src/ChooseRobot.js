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
            showColorSelector: false,
            showLeftItemSelector: false,
            showRightItemSelector: false,
            showTopItemSelector: false,
            showBottomItemSelector: false,
            selectedColor: "#eeecec",
            parts: ["TOP", "LEFT", "RIGHT", "BOTTOM"],
            selectedParts: {
                TOP: 0,
                LEFT: 0,
                RIGHT: 0,
                BOTTOM: 0
            },
            availableParts: {
                TOP: [
                    { name: "ai-aggressive", real_name: "Aggressive", description: "Aim to kill the host player as fast as possible", price: 0 },
                    { name: "ai-flanking", real_name: "Flanking", description: "Don't rush in to killing but instead flank the player from behind", price: 0 },
                    { name: "ai-objective", real_name: "Objective", description: "Collect as much points and money from the field as possible", price: 0 }
                ],
                LEFT: [
                    { name: "lo-left", real_name: "Baton", image:"baton_icon", description: "Close range disciplinary action", price: 0 },
                    { name: "mid-left", real_name: "Riot shield", image:"shield_icon", description: "Protect valuable company property", price: 55 },
                    { name: "hi-left", real_name: "Flamer", image:"flamer_icon", description: "Barbeque perpetrators at medium range", price: 300 },
                    { name: "xhi-left", real_name: "Zap gun", image:"zapgun_icon", description: "Perfect for long distance electrocution", price: 800 },
                ],
                RIGHT: [
                    { name: "lo-right", real_name: "Baton", image:"baton_icon", description: "Close range disciplinary action", price: 0 },
                    { name: "mid-right", real_name: "Riot shield", image:"shield_icon", description: "Protect valuable company property", price: 55 },
                    { name: "hi-right", real_name: "Flamer", image:"flamer_icon", description: "Barbeque perpetrators at medium range", price: 300 },
                    { name: "xhi-right", real_name: "Zap gun", image:"zapgun_icon", description: "Perfect for long distance electrocution", price: 800 },
                ],
                BOTTOM: [
                    { name: "lo-bottom", real_name: "Metal wheels", image:"metalwheels_icon", description: "Regular wheels made of metal", price: 0 },
                    { name: "mid-bottom", real_name: "Tyres", image:"tyres_icon", description: "Better grip and speed wheels", price: 55 },
                    { name: "hi-bottom", real_name: "Tracks", image:"tracks_icon", description: "Go at full grip and speed", price: 300 },
                ],
            },
            colorsList: [
                "#eeecec",
                "#d838ff",
                "#77258c",
                "#0e0e0e",
                "#3d3838",
                "#f437ab",
                "#9f0c66",
                "#530a37",
                "#1985ca",
                "#2f38e6",
                "#242f65",
                "#10173b",
                "#61ffcd",
                "#4cca4f",
                "#56911c",
                "#2d9548",
                "#ffe92f",
                "#f5993e",
                "#f08d00",
                "#e9fd3f",
                "#f74a46",
                "#fa3823",
                "#ca0d09",
                "#63090f"
            ]
        };
        this.totalPrice = this.totalPrice.bind(this);
        this.rotatePart = this.rotatePart.bind(this);
        this.swapWeapon = this.swapWeapon.bind(this);
        this.transmitRobot = this.transmitRobot.bind(this);
        this.colorSelected = this.colorSelected.bind(this);
        this.toggleItemSelector = this.toggleItemSelector.bind(this);
        this.toggleColorSelector = this.toggleColorSelector.bind(this);
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
        this.props.transmitRobot(this.state.selectedParts, this.state.selectedColor);
    }

    toggleColorSelector() {
        this.setState({
            showColorSelector: !this.state.showColorSelector
        });
    }

    toggleItemSelector(item) {
        if (item === 'LEFT') {
            this.setState({
                showLeftItemSelector: !this.state.showLeftItemSelector
            });
        }
        if (item === 'RIGHT') {
            this.setState({
                showRightItemSelector: !this.state.showRightItemSelector
            });
        }
        if (item === 'TOP') {
            this.setState({
                showTopItemSelector: !this.state.showTopItemSelector
            });
        }
        if (item === 'BOTTOM') {
            this.setState({
                showBottomItemSelector: !this.state.showBottomItemSelector
            });
        }
    }

    swapWeapon(item, part) {
        let selectedPartsCopy = { ...this.state.selectedParts };

        // get the index of the part
        let idx = this.state.availableParts[item].indexOf(part);
        // update selectedpart index
        selectedPartsCopy[item] = idx;
        console.log('swapWeapon', item, part, selectedPartsCopy);
        let newPrice = this.totalPrice(selectedPartsCopy);
        let canAfford = newPrice > this.props.budget ? false : true;
        this.setState({
            selectedParts: selectedPartsCopy,
            price: newPrice,
            canAfford: canAfford
        });
    }

    colorSelected(color) {
        this.setState({
            selectedColor: color
        });
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
                {this.state.showColorSelector ? (
                    <div className="color-selector flex-col" onClick={this.toggleColorSelector}>
                        <span className="color-selector-title">Select the color of your unit</span>
                        <div className="flex-row color-container flex-justify-center flex-align-center">
                            {this.state.colorsList.map((color, i) => {
                                return (
                                    <div
                                        className="color-selector-button"
                                        key={i}
                                        onClick={() => this.colorSelected(color)}
                                        style={{ background: color }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : null}
                {this.state.showLeftItemSelector ? (
                    <div className="item-selector flex-col" onClick={() => this.toggleItemSelector('LEFT')}>
                        <span className="item-selector-title">Select weapon (left arm)</span>
                        <div className="flex-col flex1 item-container flex-justify-center flex-align-center">
                            {this.state.availableParts['LEFT'].map((part, i) => {
                                const imageUrl = require('./assets/' + part.image + '.png');
                                console.log('part', part, imageUrl);
                                return (
                                    <div key={i} className="weapon-container full-width flex-row" onClick={() => this.swapWeapon('LEFT', part)}>
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
                {this.state.showRightItemSelector ? (
                    <div className="item-selector flex-col" onClick={() => this.toggleItemSelector('RIGHT')}>
                        <span className="item-selector-title">Select weapon (right arm)</span>
                        <div className="flex-col flex1 item-container flex-justify-center flex-align-center">
                            {this.state.availableParts['RIGHT'].map((part, i) => {
                                const imageUrl = require('./assets/' + part.image + '.png');
                                console.log('part', part, imageUrl);
                                return (
                                    <div key={i} className="weapon-container full-width flex-row" onClick={() => this.swapWeapon('RIGHT', part)}>
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
                <div className="flex-align-center full-width flex1 flex-col">
                    <div className="choose-robot-title margin-bottom10">
                        <span>Assemble your robot</span>
                    </div>
                    <div className="choose-robot-title margin-bottom10">
                        <span>Budget: {this.props.budget - this.state.price} $</span>
                        {this.state.canAfford ? null : <span>!!!TOO EXPENSIVE!!!</span>}
                    </div>
                    <div className="selection-container flex-justify-center flex-align-center flex1 flex-col full-width">
                        <div className="selection-container-image  flex-justify-center flex-align-center flex1 flex-col full-width full-height">
                            <div className="robot-top margin-bottom10 flex-row flex-align-center full-width">
                                <div className="flex-col flex-align-center full-width">
                                    <div className="part-left">
                                        <div
                                            className="color-selector-button main"
                                            onClick={this.toggleColorSelector}
                                            style={{ background: this.state.selectedColor }}
                                        />
                                        <div className="selected-part">
                                            {
                                                this.state.availableParts.TOP[
                                                    this.state.selectedParts.TOP
                                                ].name
                                            }
                                        </div>
                                        <div className="selected-part-price">
                                            {
                                                this.state.availableParts.TOP[
                                                    this.state.selectedParts.TOP
                                                ].price
                                            }$
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
                            </div>
                            <div className="flex-row flex-align-center full-width">
                                <div className="robot-left margin-bottom10 flex-col flex-align-center half-width">
                                    <div className="part-left">
                                        <div className="selected-part">
                                            {
                                                this.state.availableParts.LEFT[
                                                    this.state.selectedParts.LEFT
                                                ].name
                                            }
                                        </div>
                                        <div className="selected-part-price">
                                            {
                                                this.state.availableParts.LEFT[
                                                    this.state.selectedParts.LEFT
                                                ].price
                                            }$
                                        </div>
                                    </div>
                                    {this.state.robotTransmitted ? null : (
                                        <button
                                            className="swap-button"
                                            onClick={() => {
                                                this.toggleItemSelector("LEFT");
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="robot-right margin-bottom10 flex-col flex-align-center half-width">
                                    <div className="part-left">
                                        <div className="selected-part">
                                            {
                                                this.state.availableParts.RIGHT[
                                                    this.state.selectedParts.RIGHT
                                                ].name
                                            }
                                        </div>
                                        <div className="selected-part-price">
                                            {
                                                this.state.availableParts.RIGHT[
                                                    this.state.selectedParts.RIGHT
                                                ].price
                                            }$
                                        </div>
                                    </div>
                                    {this.state.robotTransmitted ? null : (
                                        <button
                                            className="swap-button"
                                            onClick={() => {
                                                this.toggleItemSelector("RIGHT");
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="robot-bottom margin-bottom10 flex-row flex-align-center full-width">
                                <div className="flex-col flex-align-center full-width">
                                    {this.state.robotTransmitted ? null : (
                                        <button
                                            className="swap-button"
                                            onClick={() => {
                                                this.rotatePart("BOTTOM");
                                            }}
                                        />
                                    )}
                                    <div className="part-bottom">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.robotTransmitted ? (
                        <span className="loading big">{loadingDots}</span>
                    ) : null}
                </div>
                {this.state.robotTransmitted ? (
                    <span className="button-container">Robot transmitted! Waiting for launch</span>
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
