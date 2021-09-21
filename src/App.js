import React, { Component } from "react";
import BestBooks from "./BestBooks";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BookList: [],
      title: "",
      description: "",
      status: "",
      email: "",

      showUpdate: false,
    };
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/Book-list`).then((res) => {
      this.setState({ BookList: res.data });
    });
  };
  handleDelete = (id) => {
    let config = {
      method: "DELETE",
      baseURL: process.env.REACT_APP_API_URL,
      url: `/delete-Book/${id}`,
    };
    axios(config).then((res) => {
      console.log(res.data);
    });
  };
  handleBookname = (e) => {
    this.setState({ title: e.target.value });
  };
  handleBookdescription = (e) => {
    this.setState({ description: e.target.value });
  };
  handleBookstatus = (e) => {
    this.setState({ status: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      baseURL: process.env.REACT_APP_API_URL,
      url: `/create-Book`,
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        email: this.state.email,
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      this.setState({
        BookList: res.data,
      });
    });
  };
  handleUpdate = (id, title, description, status, email) => {
    this.setState({
      title: title,
      description: description,
      status: status,
      email: email,
      id: id,
      showUpdate: true,
    });
  };
  handleUpdateForm = () => {
    let config = {
      method: "PUT",
      baseURL: process.env.REACT_APP_API_URL,
      url: `/update-Book/${this.state.id}`,
      data: {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status,
        email: this.state.email,
      },
    };
    axios(config).then((res) => {
      this.setState({
        BookList: res.data,
      });
    });
  };
  render() {
    return (
      <div>
        {!this.state.showUpdate ? (
          <>
            <form onSubmit={this.handleSubmit}>
              <input
                type="texts"
                placeholder="title"
                onChange={this.handleBookname}
              />
              <input
                type="texts"
                placeholder="description"
                onChange={this.handleBookdescription}
              />
              <input
                type="texts"
                placeholder="status"
                onChange={this.handleBookstatus}
              />
              <input
                type="texts"
                placeholder="email"
                onChange={this.handleEmail}
              />
              <input type="submit" value="create" />
            </form>
          </>
        ) : (
          // Update form
          <form onSubmit={this.handleUpdateForm}>
            <input
              type="texts"
              placeholder="title"
              onChange={this.handleBookname}
            />
            <input
              type="texts"
              placeholder="description"
              onChange={this.handleBookdescription}
            />
            <input
              type="texts"
              placeholder="status"
              onChange={this.handleBookstatus}
            />
            <input
              type="texts"
              placeholder="email"
              onChange={this.handleEmail}
            />
            <input type="submit" value="update" />
          </form>
        )}
        {this.state.BookList.map((book) => {
          return (
            <BestBooks
              title={book.title}
              description={book.description}
              status={book.status}
              email={book.email}
              id={book._id}
              handleDelete={this.handleDelete}
              handleUpdate={this.handleUpdate}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
