import React, { Component } from "react"
import { render } from "react-dom";
import HomePage from "./Homepage"


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="center">
                <h6>this is navigation bar</h6>
                <HomePage />
                <h6>this is footerz</h6>
            </div>
        )
    }
}
const appDiv= document.getElementById("app");
render(<App />, appDiv)