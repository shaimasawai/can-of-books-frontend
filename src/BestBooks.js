import axios from "axios";
import React, { Component } from "react";

class BestBooks extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>{this.props.description}</h3>
        <h3>{this.props.status}</h3>
        <h3>{this.props.email}</h3>
        <button
          onClick={() => {
            this.props.handleDelete(this.props.id);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            this.props.handleUpdate(
              this.props.id,
              this.props.title,
              this.props.description,
              this.props.status,
              this.props.email
            );
          }}
        >
          Update
        </button>
      </div>
    );
  }
}

export default BestBooks;
