import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "./AutoComplete.css";
class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      userInput: "",
      userId: "",
    };
  }

  onChange = (e) => {
    const userInput = e.currentTarget.value;

    axios
      .get(`/${userInput}`)
      .then((res) => {
        console.log(res.data.results);
        const results = res.data.results;

        const result = results.map((user) => ({
          username: user.name,
          userid: user.id,
        }));
        const filteredSuggestions = result;

        this.setState({
          activeSuggestion: 0,
          filteredSuggestions,
          showSuggestions: true,
        });
      })
      .catch((err) => console.log(err));
    this.setState({
      userInput: e.currentTarget.value,
    });
  };

  onClick = (e) => {
    console.log(e.target);

    console.log(e.target.id);

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.target.innerText,
      userId: e.target.id,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/feed",

      state: { userId: this.state.userId },
    });
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { filteredSuggestions, showSuggestions, userInput },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="list-group ">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li
                  className="list-group-item borderless"
                  key={index}
                  onClick={onClick}
                  id={suggestion.userid}
                >
                  {suggestion.username}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <div className="twitter-header">
          TWEET{" "}
          <span>
            <i className="fab fa-twitter"></i>
          </span>{" "}
          SEARCH
        </div>
        <div className="form-group has-search mx-auto">
          <span className="fas fa-search form-control-feedback"></span>
          <Fragment>
            <input
              type="text"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
              className="form-control"
            />
            <div className="suggestions"> {suggestionsListComponent}</div>
          </Fragment>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn custom-button"
            onClick={this.handleSubmit}
          >
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Autocomplete);
