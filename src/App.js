import React, { Component } from "react";
import "./App.css";
import ChooseRobot from "./ChooseRobot";

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
            loaded: false
        };
        this.startGame = this.startGame.bind(this);
        this.quit = this.quit.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
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
        if (evt.data.name) {
            this.setState({
                name: evt.data.name,
                points: evt.data.points,
                sessionId: evt.data.sessionId
            });
        }
        this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + "</span>");
    }

    onError(evt) {
        this.setState({
            loaded: true
        });
        this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);

        // NOTE: This is for debugging
        this.setState({
            name: 'HermanniHermeshön',
            points: 100,
            sessionId: 12312
        });
    }

    doSend(message) {
        this.writeToScreen("SENT: " + message);
        this.state.ws.send(message);
    }

    writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        this.state.wsoutput.appendChild(pre);
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
        console.log("start the game");
        this.toggleFullscreen();
        this.setState({
            step: 1
        });
    }

    quit() {
        this.state.ws.close();
    }

    render() {
        if (this.state.step === 0) {
            let output;
            if (!this.state.loaded) {
                output = <div>Loading...</div>;
            }
            return (
                <div className="App zero flex-col flex-align-center flex-justify-stretch">
                    <div className="welcome-title">Welcome</div>
                    <div className="output-container flex1 flex-align-center flex-justify-center">
                        <div id="wsoutput">{output}</div>
                    </div>
                    <button className="start-button" disabled={!this.state.loaded} onClick={this.startGame}></button>
                    {/* <button type="button" onClick={this.quit}>
                        sulje websocket
                    </button> */}
                </div>
            );
        } else if (this.state.step === 1) {
            return (
                <div className="App">
                    <ChooseRobot name={this.state.name} points={this.state.points}/>
                </div>
            );
        }
    }
}

export default App;
