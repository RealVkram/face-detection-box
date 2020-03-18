import React, { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation.components/Navigation";
import Logo from "./components/Logo.components/Logo";
import ImageLinkForm from "./components/ImageBar.component/ImageLinkForm";
import Rank from "./components/Rank.components/Rank";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition.components/FaceRecognition";
import SignIn from "./components/SignIn.component/SIgnIn";
import Register from "./Register.component/Register";

const app = new Clarifai.App({
  apiKey: "ccf7d971ce5a48f494663b96ccca67bd"
});

const params = {
  particles: {
    number: {
      value: 80
    },
    size: {
      value: 2
    },
    density: {
      enable: true,
      value_area: 800
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
};

class App extends Component {
  state = {
    input: "",
    imageURL: "",
    count: 0,
    box: {},
    route: "signin",
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",  
      entries: 0,
      joined: ""
    }
  };

  loadUser = ({id, name, email, entries, joined}) => {
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,  
        entries: entries,
        joined: joined
      }
    })
  }

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {

    

    this.setState({ box: box });

    // if (this.displayFaceBox) {     

    //     return this.setState(prevState => ({
    //       entries: prevState.user.entries + 1
    //     }));
      
    // };
  }

  onInputChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  onSubmitDetect = () => {
    this.setState(prevState => ({ imageURL: prevState.input }));

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("http://localhost:3001/image", {
              method: "put",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState({
              user: {
                entries: count
              }
            })
          })
        }        
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else {
      this.setState({ isSignedIn: true });
    }

    this.setState({
      route: route
    });
  };

  render() {

    const { imageURL, box, isSignedIn, route, } = this.state;
    const { name, entries } = this.state.user

    return (
      <div className="App">
        <Particles params={params} className="particles" />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={name} entries={entries}/>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmitDetect={this.onSubmitDetect}
              imageUrl={imageURL}
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
        ) : route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        ) : (
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )}
      </div>
    );
  }
}

export default App;
