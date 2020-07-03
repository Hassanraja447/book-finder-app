import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      books: [],
    };
  }
  fetchdata(searchTerm) {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then((res) => {
        this.setState({ books: res.data.items });
      });
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchdata(searchTerm);
  }

  handleChangeValue = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.fetchdata(searchTerm);
  };

  addThumbnail(book) {
    let src = book.volumeInfo.imageLinks;
    if (typeof src === "undefined") {
      return "https://via.placeholder.com/400";
    } else {
      return src.thumbnail;
    }
  }
  truncateStr(str) {
    console.log(str);
    if (str !== undefined) {
      return str.length > 150 ? str.substring(0, 150) + " ..." : str;
    }
    return "Description Not available";
  }

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
          {this.state.books.length > 0 &&
            this.state.books.map((book) => (
              <li className="bookItem" key={book.id}>
                <img className="bookImg" src={this.addThumbnail(book)}></img>
                <div className="bookInfo">
                  <div className="bookInfo-row">
                    <label className="bookInfo-label">Title</label>
                    <p className="bookTitle"> {book.volumeInfo.title}</p>
                  </div>
                  <div className="bookInfo-row">
                    <label className="bookInfo-label">Description</label>
                    <p className="bookTitle">
                      {" "}
                      {this.truncateStr(book.volumeInfo.description) ||
                        "Description not available"}{" "}
                    </p>
                  </div>
                  <div className="bookInfo-row">
                    <p className="bookTitle">
                      <a href={book.volumeInfo.infoLink}>Find More</a>
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
