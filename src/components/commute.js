import React, { Component } from "react";
import { Navbar, Nav, Card, Button } from "react-bootstrap";
import conekt from "./../conekt.png";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Miniform from "./Miniform";
import Miniformcomment from "./Miniformcomment";
class commute extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.getcomment = this.getcomment.bind(this);
    this.newcomment = this.newcomment.bind(this);
    this.onclicknewpost = this.onclicknewpost.bind(this);
    this.gettext = this.gettext.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.seecomments = this.seecomments.bind(this);
    this.state = {
      redirect: false,
      dashboard: false,
      data: null,
      createpost: false,
      post: "",
      createcomment: false,
      comment: "",
      ppid: "",
      data2: [],
      mainpost: "",
      seecom: false
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.location.state.data });
  }

  async seecomments(id, text) {
    Axios.post("https://conektapi.herokuapp.com/posts/get-comments", {
      usertoken: this.props.location.state.userToken,
      parentPostId: id
    })
      .then(res => {
        if (res.data.message) {
          if (res.data.data.length > 0) {
            this.setState({
              mainpost: text,
              ppid: id,
              data2: res.data.data,
              seecom: true
            });
          } else {
            alert("no comments");
          }
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  newcomment(id) {
    this.setState({
      createcomment: true,
      ppid: id
    });
  }

  onclicknewpost() {
    this.setState({
      createpost: true
    });
  }

  async getcomment(e) {
    e.preventDefault();
    const comment = e.target.elements.post.value;
    console.log(comment);
    console.log(this.state.ppid);
    if (comment) {
      Axios.post("https://conektapi.herokuapp.com/posts/create-comment", {
        usertoken: this.props.location.state.userToken,
        text: comment,
        parentPostId: this.state.ppid,
        postCategory: "transport"
      })
        .then(res => {
          if (res.data.message) {
            this.setState({
              createcomment: false,
              ppid: ""
            });
            alert("Done! Redirecting you back to dashboard");
            this.setState({
              dashboard: true
            });
          }
        })
        .catch(error => {
          this.setState({
            createcomment: false,
            ppid: ""
          });
          alert(error);
        });
    }
  }

  async gettext(e) {
    e.preventDefault();
    const post = e.target.elements.post.value;
    console.log(post);
    if (post) {
      Axios.post("https://conektapi.herokuapp.com/posts/create-post", {
        usertoken: this.props.location.state.userToken,
        text: post,
        postCategory: "transport",
        parentPost: "root"
      })
        .then(res => {
          if (res.data.message) {
            this.setState({
              createpost: false
            });
            alert("Done! Redirecting you back to dashboard");
            this.setState({
              dashboard: true
            });
          }
        })
        .catch(error => {
          this.setState({
            createpost: false
          });
          alert(error);
        });
    }
  }

  async onclick() {
    Axios.get(
      "https://conektapi.herokuapp.com/users/logout/" +
        this.props.location.state.userToken
    )
      .then(res => {
        if (res.data.message) {
          alert("LOGGED out successfully");
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  onclickdashboard() {
    this.setState({ dashboard: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.dashboard) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { userToken: this.props.location.state.userToken }
          }}
        />
      );
    }
    if (this.state.seecom) {
      return (
        <Redirect
          to={{
            pathname: "/comments",
            state: {
              userToken: this.props.location.state.userToken,
              data: this.state.data2,
              text: this.state.mainpost,
              parent: this.state.ppid,
              category: "transport"
            }
          }}
        />
      );
    }
  }
  render() {
    const obj = this.state.data.map(
      ({ _id, opId, opName, text, displayTime }) => {
        return (
          <Card body style={{ margin: "4px" }}>
            <h4 key={opId}>{text}</h4>
            <p>
              Posted by: {opName} on {displayTime}
            </p>
            <Button
              onClick={() => this.newcomment(_id)}
              variant="dark"
              style={{ float: "right" }}
            >
              Comment
            </Button>
            {this.state.createcomment ? (
              <Miniformcomment getcomment={this.getcomment} />
            ) : null}

            <Button
              onClick={() => this.seecomments(_id, text)}
              variant="dark"
              style={{ float: "right" }}
            >
              See comments
            </Button>
          </Card>
        );
      }
    );
    return (
      <div>
        {this.renderRedirect()}

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={conekt} alt="conekt" height="60px" />
          </Navbar.Brand>
          <h1>#COMMUTE</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button
                className="but"
                variant="dark"
                onClick={this.onclicknewpost}
              >
                CreateNewPost
              </Button>
            </Nav>
            <Nav>
              <Button
                className="but"
                variant="dark"
                onClick={this.onclickdashboard}
              >
                Dashboard
              </Button>
            </Nav>
            <Nav>
              <Button className="but" variant="danger" onClick={this.onclick}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.state.createpost ? <Miniform gettext={this.gettext} /> : null}
        <div className="back" style={{ height: "100%" }}>
          <div>{obj}</div>
        </div>
      </div>
    );
  }
}

export default commute;
