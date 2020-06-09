import React from "react";

class SearchInput extends React.Component {
  render() {
    return (
      <input
        type="text"
        className="search-input"
        value={this.props.value}
        onChange={this.props.onChangeValue}
      ></input>
    );
  }
}

export default SearchInput;
