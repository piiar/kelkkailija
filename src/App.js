import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsUri: "ws://localhost:7777/",
            output: null,
            ws: null,
            fullscreen: false
        };
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }

    componentDidMount() {
        this.setState({
            output: document.getElementById("output")
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
        this.writeToScreen("CONNECTED");
        this.doSend("{'command': 'joinGame'}");
    }

    onClose(evt) {
        this.writeToScreen("DISCONNECTED");
    }

    onMessage(evt) {
        this.writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + "</span>");
        this.state.ws.close();
    }

    onError(evt) {
        this.writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
    }

    doSend(message) {
        this.writeToScreen("SENT: " + message);
        this.state.ws.send(message);
    }

    writeToScreen(message) {
        var pre = document.createElement("p");
        pre.style.wordWrap = "break-word";
        pre.innerHTML = message;
        this.state.output.appendChild(pre);
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

    render() {
        let fullscreenButton = null;
        if (this.state.fullscreen) {
            fullscreenButton = <button onClick={this.toggleFullscreen}>Exit fullscreen</button>;
        } else {
            fullscreenButton = <button onClick={this.toggleFullscreen}>Start</button>;
        }
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Kelkkailija</h1>
                    {fullscreenButton}
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div id="output" />
            </div>
        );
    }
}

export default App;
