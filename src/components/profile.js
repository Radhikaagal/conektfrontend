import React, { Component } from "react";
import { Button, Navbar, Nav, Card, Image } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import conekt from "./../conekt.png";
import Miniformprofile from "./Miniformprofile";
class profile extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.onclickdel = this.onclickdel.bind(this);
    this.onclickedit = this.onclickedit.bind(this);
    this.gettext = this.gettext.bind(this);
    this.state = {
      reload: false,
      redirect: false,
      dashboard: false,
      data: null,
      editprofile: false
    };
  }

  componentWillMount() {
    this.setState({ data: this.props.location.state.data });
  }

  onclickedit() {
    this.setState({
      editprofile: true
    });
  }

  async gettext(e) {
    e.preventDefault();
    const username = e.target.elements.usname.value;
    const bio = e.target.elements.bio.value;
    console.log(username);
    console.log(bio);
    Axios.post("https://conektapi.herokuapp.com/users/edit-profile", {
      usertoken: this.props.location.state.userToken,
      newUserName: username,
      newBio: bio
    })
      .then(res => {
        if (res.data.message) {
          this.setState({
            editprofile: false
          });
          alert("Done! Redirecting you back to dashboard");
          this.setState({
            dashboard: true
          });
        }
      })
      .catch(error => {
        this.setState({
          editprofile: false
        });
        alert(error);
      });
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
        alert(error.response.data.message, "danger");
      });
  }

  onclickdashboard() {
    this.setState({ dashboard: true });
  }

  async onclickdel(id) {
    // alert(id);
    Axios.post("https://conektapi.herokuapp.com/posts/delete-post", {
      usertoken: this.props.location.state.userToken,
      postid: id 
    }).then(res => {
      if (res.data.message) {
        this.setState({
          dashboard: true
        });
      }
    });
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
    const obj = JSON.parse(this.state.data).posts.map(
      ({ _id, opID, opName, text, displayTime }) => {
        return (
          <Card body style={{ margin: "4px" }}>
            <h4 key={opID}>{text}</h4>
            <p>
              Posted by: {opName} on {displayTime}
            </p>
            <Button
              onClick={() => this.onclickdel(_id)}
              variant="danger"
              style={{ float: "right" }}
            >
              Delete
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
          <h1>PROFILE</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button
                classname="but"
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
        <div className="back" style={{ textAlign: "center", height: "100%" }}>
          <div style={{ display: "inline-block", marginTop: "30px" }}>
            <Card style={{ width: "100vh", margin: "10px" }}>
              <Card.Body>
                <Card.Title>{JSON.parse(this.state.data).userName}</Card.Title>
                <div>
                  <Image
                    width="200px"
                    src={JSON.parse(this.state.data).profilePic}
                    rounded
                  />
                </div>
                <Card.Text>
                  <div>
                    <label>Branch/Department: </label>
                    <label className="normalLabel">
                      {JSON.parse(this.state.data).branch}
                    </label>
                  </div>
                  <div className="alignCenter">
                    <label>Bio: </label>
                    {JSON.parse(this.state.data).bio}
                  </div>
                </Card.Text>
                <Button onClick={this.onclickedit} variant="dark">
                  Edit Profile
                </Button>
                {this.state.editprofile ? (
                  <Miniformprofile
                    gettext={this.gettext}
                    username={JSON.parse(this.state.data).userName}
                    bio={JSON.parse(this.state.data).bio}
                  />
                ) : null}
              </Card.Body>
            </Card>
            <Button variant="light" className="but" style={{ width: "100vh" }}>
              Your Posts
            </Button>
            <div>{obj}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default profile;
