// src/components/BrightcovePlayer.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// You can style the Player component
// import './BrightcovePlayer.css';
import Player from '@brightcove/react-player-loader';

class BrightcovePlayer extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired
  }

  shouldComponentUpdate (nextProps) {
    return this.props.videoId !== nextProps.videoId;
  }

  loadVideo = () => {
    this.playerRef.catalog.getVideo(this.props.videoId, (err, data) => {
      if (err) {
        return console.error('error', err);
      }
      this.playerRef.catalog.load(data);
    });
  }

  componentDidUpdate (prevProps) {
    this.loadVideo();
  }

  // This is provided to the `onSuccess` prop of `Player`
  success = ({ ref }) => {
    // This gives us a reference to the successfully created player
    this.playerRef = ref;

    // call load using the videoId provided via the prop `selectedVideo`
    this.loadVideo();
  };

  render () {
    // The onSucess callback is required
    return (
      <Player
        attrs={{ id: 'videoPlayer' }}
        accountId='6027103981001'
        playerId='default'
        onSuccess={this.success}
        options={{
          controls: true,
          fluid: true
        }}
      />
    );
  }
}

export default BrightcovePlayer;
