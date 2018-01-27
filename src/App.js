import React, { Component } from "react";
import "./App.css";
import ChooseRobot from "./ChooseRobot";
import Actions from "./Actions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsUri: "ws://192.168.0.105:7777/",
            // wsUri: "ws://localhost:7777/",
            wsoutput: null,
            ws: null,
            fullscreen: false,
            step: 0,
            loaded: false,
            budget: 1000,
            gameStates: {
                WELCOME: 0,
                CHOOSE_ROBOT: 1,
                INGAME: 2,
                HIGHSCORE: 3
            }
        };
        this.startGame = this.startGame.bind(this);
        this.quit = this.quit.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.handletransmitRobot = this.handletransmitRobot.bind(this);
    }

    componentDidMount() {
        this.setState({
            wsoutput: document.getElementById("wsoutput")
        });
        this.testWebSocket();
    }

    componentWillUnmount() {
        if (this.state.ws) {
            this.state.ws.close();
        }
    }

    testWebSocket() {
        let ws = new WebSocket(this.state.wsUri);
        ws.onopen = evt => {
            this.onOpen(evt);
        };
        ws.onclose = evt => {
            this.onClose(evt);
        };
        ws.onmessage = evt => {
            this.onMessage(evt);
        };
        ws.onerror = evt => {
            this.onError(evt);
        };
        this.setState({
            ws: ws
        });
    }

    onOpen(evt) {
        this.setState({
            loaded: true
        });
        this.writeToScreen("CONNECTED");
        this.doSend("{'command': 'joinGame'}");
    }

    onClose(evt) {
        this.setState({
            loaded: true
        });
        this.writeToScreen("DISCONNECTED");
    }

    onMessage(evt) {
        this.setState({
            loaded: true
        });

        let dataJson = JSON.parse(evt.data.replace(/'/g, '"'));

        if (dataJson.name) {
            this.setState({
                name: dataJson.name,
                points: dataJson.points,
                token: dataJson.token
            });
        }

        this.writeToScreen(
            "<div>Your assigned serial number is</div>" +
                '<div style="font-size: 1.5em">' +
                this.state.name +
                "</div>"
        );
    }

    onError(evt) {
        this.setState({
            loaded: true
        });
        this.writeToScreen('<span style="color: orange;">ERROR:</span> ' + evt.data);
    }

    doSend(message) {
        this.writeToScreen("SENT: " + message);
        this.state.ws.send(message);
    }

    writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        // this.state.wsoutput.appendChild(pre);
        this.state.wsoutput.innerHTML = pre.outerHTML;
    }

    toggleFullscreen() {
        if (
            (document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)
        ) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
                this.setState({
                    fullscreen: true
                });
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
                this.setState({
                    fullscreen: true
                });
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                this.setState({
                    fullscreen: true
                });
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
                this.setState({
                    fullscreen: false
                });
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                this.setState({
                    fullscreen: false
                });
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
                this.setState({
                    fullscreen: false
                });
            }
        }
    }

    startGame() {
        this.toggleFullscreen();
        this.setState({
            step: 1
        });
    }

    quit() {
        this.state.ws.close();
    }

    handletransmitRobot(selectedParts) {
        let message = {
            command: 'transmitRobot',
            robot: selectedParts
        }
        if (this.state.loaded) {
            this.state.ws.send(JSON.stringify(message));
        } else {
            console.log('not loaded yet');
        }
    }

    render() {
        if (this.state.step === this.state.gameStates.WELCOME) {
            let output, transmitText, transmitExtra, startButton, loadingDots;
            if (!this.state.loaded) {
                output = <div>Transmitting</div>;
            }
            if (this.state.name) {
                transmitText = "Your transmission is being relayed.";
                transmitExtra = "You will be displayed in the lobby within 25 seconds.";
                startButton = (
                    <button
                        className="start-button"
                        disabled={!this.state.loaded}
                        onClick={this.startGame}
                    />
                );
            } else {
                transmitText = "Transmitting";
                loadingDots = (
                    <span>
                        {" "}
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                );
            }
            return (
                <div className="App flex-col">
                    <div className="welcome-title">Welcome</div>
                    <div className="output-container flex1 flex-col flex-align-center flex-justify-center">
                        <div id="wsoutput">{output}</div>
                        <div className="loading big">{loadingDots}</div>
                    </div>
                    <div className="button-container">
                        <div className="transmit loading">
                            {transmitText}
                            {loadingDots}
                        </div>
                        <div className="transmit-extra">{transmitExtra}</div>
                        {startButton}
                    </div>
                </div>
            );
        } else if (this.state.step === this.state.gameStates.CHOOSE_ROBOT) {
            return (
                <div className="App flex-col">
                    <ChooseRobot
                        transmitRobot={this.handletransmitRobot}
                        name={this.state.name}
                        points={this.state.points}
                        budget={this.state.budget}
                    />
                </div>
            );
        } else if (this.state.step === this.state.gameStates.INGAME) {
            return (
                <div className="App flex-col">
                    <Actions
                        aiMode={this.state.aiMode}
                        name={this.state.name}
                        points={this.state.points}
                    />
                </div>
            );
        } else if (this.state.step === this.state.gameStates.HIGHSCORE) {
        }
    }
}

export default App;
