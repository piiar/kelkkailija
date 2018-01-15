import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wsUri: "ws://localhost:7777/",
            output: null,
            ws: null
        };
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
        this.doSend("joinGame");
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Kelkkailija</h1>
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
