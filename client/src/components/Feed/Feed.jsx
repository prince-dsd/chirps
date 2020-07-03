import React, { Component } from "react";
import axios from "axios";
import "./Feed.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    console.log(this.props.location.state.userId);
    const userId = this.props.location.state.userId;
    axios
      .get(`tweets/${userId}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className="row">
        {data.map((tweet) => (
          <div key={tweet.id} className="column">
            <div className="card">
              <div className="profile-container">
                <div className="profile">
                  <img
                    className="profileimg"
                    src={tweet.user.profile_image_url}
                    alt="Profile"
                  ></img>
                </div>
                <div className="username">
                  <h3>{tweet.user.name}</h3>
                  <p>{tweet.user.screen_name}</p>
                </div>
                <div className="date">
                  <p>
                    {tweet.created_at.slice(4, 10)},{tweet.created_at.slice(-5)}
                  </p>
                </div>
              </div>

              <p>{tweet.text}</p>

              <div className="icons">
                <div className="comment">
                  <div className="count">
                    <i className="far fa-comment"></i>
                    {tweet.favorite_count}
                  </div>
                </div>
                <div className="retweet">
                  <div className="count">
                    <i className="fas fa-retweet"></i>
                    {tweet.retweet_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default Feed;
