// src/components/BrightcovePlayer.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// You can style the Player component
// import './BrightcovePlayer.css';
import Player from '@brightcove/react-player-loader';

class BrightcovePlayer extends Component {
  static propTypes = {
    videoId: PropTypes.string
  }

  shouldComponentUpdate (nextProps) {
    return this.props.videoId !== nextProps.videoId;
  }

  componentDidUpdate (prevProps) {
    this.playerRef.catalog.getVideo(this.props.videoId, (error, video) => {
      if (error) {
        return console.error('error', error);
      }
      this.playerRef.catalog.load(video);
    });
  }

  // This is provided to the `onSuccess` prop of `Player`
  success = ({ ref }) => {
    // This gives us a reference to the successfully created player
    this.playerRef = ref;

    // call load using the videoId provided via the prop `selectedVideo`
    if (this.props.videoId) {
      this.playerRef.catalog.load({
        sources: [this.props.videoId]
      });
    }
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
