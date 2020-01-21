import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Navbar, Nav, Card, Button } from "react-bootstrap";
import Axios from "axios";
import conekt from "./../conekt.png";
import Miniformcomment from "./Miniformcomment";
class comments extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclicknewcomment = this.onclicknewcomment.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.getcomment = this.getcomment.bind(this);
    this.state = {
      data: null,
      mainpost: "",
      ppid: "",
      category: "",
      redirect: false,
      dashboard: false,
      newcomment: false
    };
  }
  componentWillMount() {
    this.setState({
      data: this.props.location.state.data,
      mainpost: this.props.location.state.text,
      ppid: this.props.location.state.parent,
      category: this.props.location.state.category
    });
  }

  onclicknewcomment() {
    this.setState({ newcomment: true });
  }

  async getcomment(e) {
    e.preventDefault();
    const comment = e.target.elements.post.value;
    if (comment) {
      Axios.post("https://conektapi.herokuapp.com/posts/create-comment", {
        usertoken: this.props.location.state.userToken,
        text: comment,
        parentPostId: this.state.ppid,
        postCategory: this.state.category
      })
        .then(res => {
          if (res.data.message) {
            this.setState({
              newcomment: false
            });
            alert("Done! Redirecting you back to dashboard");
            this.setState({
              dashboard: true
            });
          }
        })
        .catch(error => {
          this.setState({
            newcomment: false
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
  }
  render() {
    const obj = this.state.data.map(({ opId, opName, text, displayTime }) => {
      return (
        <Card body style={{ margin: "4px" }}>
          <h4 key={opId}>{text}</h4>
          <p>
            Posted by: {opName} on {displayTime}
          </p>
        </Card>
      );
    });

    return (
      <div>
        {this.renderRedirect()}

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={conekt} alt="conekt" height="60px" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button
                className="but"
                variant="dark"
                onClick={this.onclicknewcomment}
              >
                CreateNewComment
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
        <Card body style ={{ background : "black", color:"white"}}> <h1>{this.state.mainpost}</h1> </Card>
        {this.state.newcomment ? (
          <Miniformcomment getcomment={this.getcomment} />
        ) : null}
        <div className="back" style={{ height: "100%" }}>
          <div>{obj}</div>
        </div>
      </div>
    );
  }
}
export default comments;
