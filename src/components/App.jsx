import './App.css';
import React, { Component } from 'react';
import VideoDropdown from './VideoDropdown';
import BrightcovePlayer from './BrightcovePlayer';

export default class App extends Component {
  state = {
    video: null
  };

  handleVideoChange = (video) => {
    this.setState({ video });
  };

  render () {
    return (
      <div className='App'>
        <VideoDropdown onVideoChange={this.handleVideoChange} />
        <BrightcovePlayer videoId={this.state.video && this.state.video.id} />
      </div>
    );
  }
}
