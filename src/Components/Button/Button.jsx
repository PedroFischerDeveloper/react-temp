import { Component } from "react";
import "./styles.css";
export class Button extends Component {
  render() {
    const { text, click, disabled } = this.props;

    return (
      <button className="button" disabled={disabled} onClick={click}>
        {text}
      </button>
    );
  }
}
