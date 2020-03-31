import React from "react";

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  onChangeName = e => {
    const { value } = e.target;

    this.setState({
      name: value
    });
  };

  onChangeEmail = e => {
    const { value } = e.target;

    this.setState({
      email: value
    });
  };

  onChangePassword = e => {
    const { value } = e.target;

    this.setState({
      password: value
    });
  };

  onHandleRegisterSubmit = () => {
    const { email, password, name } = this.state;

    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    // const { registerEmail, registerPassword, registerName } = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onChangeName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onChangePassword}
                />
              </div>
            </fieldset>
            <div className="lh-copy mt3">
              <p
                onClick={this.onHandleRegisterSubmit}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
