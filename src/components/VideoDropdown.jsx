// src/components/VideoIdDropdown.jsx
// These need to be imported to create a React component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeApiCall from '../oauthUtils';

class VideoDropdown extends Component {
  static propTypes = {
    onVideoChange: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      videos: []
    }
  }

  componentDidMount () {
    this.fetchVideoList();
  }

  fetchVideoList () {
    const defaultAccountId = '6027103981001';
    // CMS API
    const cmsBaseUrl = 'https://cms.api.brightcove.com/v1';
    const getVideosEndpoint = `/accounts/${defaultAccountId}/videos`;

    makeApiCall(cmsBaseUrl + getVideosEndpoint, 'GET')
      .then((videos) => {
        console.log('video response', videos);
        this.setState({ videos });
        this.props.onVideoChange(videos[0]);
      });
  }

  handleChange = (event) => {
    const videoId = event.target.value;
    const video = this.state.videos.find(video => video.id === videoId);
    this.props.onVideoChange(video);
  };

  render () {
    return (
      <div>
        <select onChange={this.handleChange}>
          {this.state.videos.map((video) => (
            <option value={video.id} key={video.id}>{video.name}</option>
          ))}
        </select>
      </div>
    );
  }
};

// we should export the class for use in other files
export default VideoDropdown;
