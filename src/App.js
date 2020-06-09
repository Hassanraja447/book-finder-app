import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      books: [],
    };
  }
  componentDidMount() {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=javascript`)
      .then((res) => {
        console.log(res.data.items);
        this.setState({ books: res.data.items });
      });
  }
  handleChangeValue = (e) => {
    this.setState({ searchTerm: e.target.value }, () =>
      console.log(this.state.searchTerm)
    );
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="big-heading">Book Finder</h1>
          <input
            type="text"
            className="search-input"
            value={this.state.searchTerm}
            onChange={this.handleChangeValue}
          ></input>
        </header>
        <ul className="bookList">
          {this.state.books.map((book) => (
            <li className="bookItem" key={book.id}>
              <img src={book.volumeInfo.imageLinks.thumbnail}></img>
              <h6 className="bookTitle"> {book.volumeInfo.title}</h6>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
