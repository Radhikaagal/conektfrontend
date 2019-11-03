import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from 'axios';
class homepage extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPassChange = this.onPassChange.bind(this);
        this.onSignInSubmit=this.onSignInSubmit.bind(this);
        this.state = {
          username: "",
          email: "",
          password: "",
          branch: "Computer Science and Engineering",

          signInName:"",
          signInPassword:"",

          loggedIn:false,
          userToken:""
        };
      }


      renderRedirect = () => {
        if(this.state.loggedIn) {
            return <Redirect to={{pathname: '/dashboard',
                state: {loggedIn: true,userToken:this.state.userToken}}}
            />
        }
    }


      onNameChange(e) {
        this.setState({
          signInName: e.target.value
        });
      }


      onPassChange(e) {
        this.setState({
          signInPassword: e.target.value
        });
      }



      async onSignInSubmit(e) {
        e.preventDefault();
    
        Axios.post("https://conektapi.herokuapp.com/users/login/", {
          userId: this.state.signInName,
          password: this.state.signInPassword
        })
          .then(res => {
            if (res.data.message) {
              this.setState({loggedIn:true,userToken:res.data.data.userToken});
            }   
            
          })
          .catch(error => {
           alert(error.response.data.message, "danger");
          });
    
        // console.log(`Form submitted`);
        // console.log(`username : ${this.state.username}`);
        // console.log(`email : ${this.state.email}`);
        // console.log(`password : ${this.state.password}`);
        // console.log(`branch : ${this.state.branch}`);
        // this.props.history.push("/");
      }

    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    
      onChangeOption(e) {
        this.setState({
          branch: e.target.value
        });
      }
    
      async onSignUpSubmit(e) {
        e.preventDefault();
    
        Axios.post("https://conektapi.herokuapp.com/users/register/", {
          userName: this.state.username,
          email: this.state.email,
          branch: this.state.branch,
          password: this.state.password
        })
          .then(res => {
            if (res.data.message) {
              alert(
                "User registered successfully! Please verify your email to continue",
                "success"
              );
            }
            this.setState({
              username: "",
              email: "",
              password: "",
              branch: "Computer Science and Engineering"
            });
    
            
          })
          .catch(error => {
           alert(error.response.data.message, "danger");
          });
    
        // console.log(`Form submitted`);
        // console.log(`username : ${this.state.username}`);
        // console.log(`email : ${this.state.email}`);
        // console.log(`password : ${this.state.password}`);
        // console.log(`branch : ${this.state.branch}`);
        // this.props.history.push("/");
      }



  render() {
    return (
      <div>
          {this.renderRedirect()}
        <div>
          <Jumbotron fluid>
            <Container>
              <h1>CONEKT</h1>
            </Container>
          </Jumbotron>
        </div>

        <div>
          <form onSubmit={this.onSignUpSubmit} className="left FormRules">
            <div className="form-group FormField">
              <label className="FormField__Label" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                id="name"
                className="FormField__Input"
                placeholder="Enter your full name"
                name="userName"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group FormField">
              <label className="FormField__Label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="FormField__Input"
                placeholder="Enter your email"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group FormField">
              <label className="FormField__Label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="form-group FormField">
              <label className="FormField__Label">
                select your branch
                <select
                  className="custom-select"
                  editable="true"
                  name="branch"
                  value={this.state.branch}
                  onChange={this.onChangeOption}
                >
                  <option value="Computer Science and Enginnering">
                    Computer Science and Enginnering
                  </option>
                  <option value="Information Science and Enginnering">
                    Information Science and Enginnering
                  </option>
                  <option value="Electronics and Communications Enginnering">
                    Electronics and Communications Enginnering
                  </option>
                  <option value="Electrical and Electronics Enginnering">
                    Electrical and Electronics Enginnering
                  </option>
                  <option value="Electronics and Instrumentation Engineering">
                    Electronics and Instrumentation Engineering
                  </option>
                  <option value="Mechanical Enginnering">
                    Mechanical Enginnering
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                </select>
              </label>
            </div>
            <div className="form-group FormField">
              <input
                className="btn btn-dark btn-block"
                type="submit"
                value="Sign-Up"
              />
            </div>
          </form>

          <form onSubmit={this.onSignInSubmit} className="right FormRules" method="post">
            <div className="form-group FormField">
              <label className="FormField__Label" htmlFor="name">
                Username
              </label>
              <input
                type="text"
                id="name"
                className="FormField__Input"
                placeholder="Enter your username or email"
                name="signInName"
                value={this.state.signInName}
                onChange={this.onNameChange}
              />
            </div>
            <div className="form-group FormField">
              <label className="FormField__Label" htmlFor="email">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Enter your password"
                name="signInPassword"
                value={this.state.signInPassword}
                onChange={this.onPassChange}
              />
            </div>
            <div className="form-group FormField">
              <input
                className="btn btn-dark btn-block"
                type="submit"
                value="Sign-In"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default homepage;