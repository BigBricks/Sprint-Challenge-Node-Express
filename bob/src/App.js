import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    this.getProjects();
  }
  getProjects = () => {
    axios
      .get(`http://localhost:5000/api/project`)
      .then(response => {
        this.setState({ projects: response.data })
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
         {this.state.projects.map(project => {
         return (
           <div className ="project-card"key={project.id} >
            <h2> {project.name}</h2>
            <h4>{project.description}</h4>
             </div>
         )
       })}
      </div>
    );
  }
}

export default App;
