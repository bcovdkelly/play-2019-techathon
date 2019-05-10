// src/components/AnalyticsFetcher.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Import our utlity methodA
import makeApiCall from '../oauthUtils';

class AnalyticsFetcher extends Component {
  static propTypes = {
    video: PropTypes.object
  };

  constructor (...args) {
    super(...args);
    this.state = {
      analyticData: null
    };
    this.getAnalyticsForVideo = this.getAnalyticsForVideo.bind(this);
  }

  componentDidMount () {
    if (this.props.video) {
      this.getAnalyticsForVideo(this.props.video);
    }
  }

  componentDidUpdate (prevProps) {
    const { video } = this.props;
    if (!video) {
      return;
    }
    if (!prevProps.video || video.id !== prevProps.video.id) {
      this.getAnalyticsForVideo(video);
    }
  }

  getAnalyticsForVideo (video) {
    const defaultAccountId = '6027103981001';

    // Analytics API
    const analyticsReportEndpoint = 'https://analytics.api.brightcove.com/v1/data';
    const accountsQueryParam = `accounts=${defaultAccountId}`;
    const dimensionsQueryParam = '&dimensions=video';
    const fieldsQueryParam = '&fields=video,video_duration,video_engagement_1,video_engagement_100,video_engagement_25,video_engagement_50,video_engagement_75,video_impression,video_percent_viewed,video_seconds_viewed';
    const filterQueryParam = `&where=video==${video.id}`;
    const queryString = '?' + accountsQueryParam + dimensionsQueryParam + fieldsQueryParam + filterQueryParam;
    const apiCall = analyticsReportEndpoint + queryString;
    const method = 'GET';

    makeApiCall(apiCall, method)
      .then((response) => {
        this.setState({
          analyticData: response
        })
      })
      .catch(error => console.error('Error:', error))
  }

  render () {
    return (
      <div>
        <label>Video Analytics:</label>
        {this.state.analyticData && (
          <pre>{ JSON.stringify(this.state.analyticData, null, 2) }</pre>
        )}
      </div>
    );
  }
}

export default AnalyticsFetcher;
