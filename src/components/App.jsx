import './App.css';
import React, { Component } from 'react';
import VideoDropdown from './VideoDropdown';
import BrightcovePlayer from './BrightcovePlayer';
import Analytics from './Analytics';

export default class App extends Component {
  state = {
    video: null
  };

  handleVideoChange = (video) => {
    this.setState({ video });
  };

  render () {
    const { video } = this.state;

    return (
      <div className='App'>
        <VideoDropdown onVideoChange={this.handleVideoChange} />
        {video && (
          <React.Fragment>
            <BrightcovePlayer videoId={video && video.id} />
            <Analytics video={video} />
          </React.Fragment>
        )}
      </div>
    );
  }
}
