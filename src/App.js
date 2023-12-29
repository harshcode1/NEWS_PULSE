import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  ApiKey ="12a1f048cddf4956b90c5446edc04519" // Here wanted to use .env file but was not working Don't know why
  c = 'Harsh Soni'
  page = 5;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <>
        <Router>
          <div>
            <NavBar />
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Routes>
              {/* here we need to give them all unique keys and so that after each click compomemts is loaded */}
              <Route exact path="/" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="General" pageSize={this.page} country="in" category="General" />} />
              <Route exact path="/business" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Business" pageSize={this.page} country="in" category="Business" />} />
              <Route exact path="/entertainment" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Sports" pageSize={this.page} country="in" category="Entertainment" />} />
              <Route exact path="/general" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="General" pageSize={this.page} country="in" category="General" />} />
              <Route exact path="/health" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Health" pageSize={this.page} country="in" category="Health" />} />
              <Route exact path="/science" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Science" pageSize={this.page} country="in" category="Science" />} />
              <Route exact path="/sports" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Sport" pageSize={this.page} country="in" category="Sports" />} />
              <Route exact path="/technology" element={<News ApiKey = {this.ApiKey} setProgress = {this.setProgress}  key="Technology" pageSize={this.page} country="in" category="Technology" />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}


