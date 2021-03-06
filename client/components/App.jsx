import React from 'react';
import $ from 'jquery';
import HostInfo from './HostInfo.jsx';
import HostDescription from './HostDescription.jsx';
import ContactAirbnb from './AlwaysContactAbnb.jsx';
import Neighborhood from './Neighborhood.jsx';
// import GoogleMap from './Map.jsx';
import CSSModules from 'react-css-modules';
import styles from './css/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: +props.id,
      listingId: +props.listingId,
      host: {},
      joinMonth: '',
      joinYear: '',
      numsOfReviews: 0,
      reviewWording: 'reviews',
      neighborhoodInfo: null,
    };

    this.verifiedOrNot = this.verifiedOrNot.bind(this);
    this.responseTimeConvertor = this.responseTimeConvertor.bind(this);
  }

  componentDidMount() {
    this.getHostInfo();
    this.getReviewInfo();
    this.getNeighborhoodInfo();
    this.reviewOrReviews();
  }

  getHostInfo() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $.get(`/api/about/hosts/${this.state.id}`, (data) => {
      this.setState({ host: JSON.parse(data)[0] });
      this.setState({ joinMonth: monthNames[Number(this.state.host.joined_in_date.split('-')[1]) - 1] });
      this.setState({ joinYear: this.state.host.joined_in_date.split('-')[0] });
    });
  }

  getReviewInfo() {
    $.get(`/api/about/reviews/${this.state.id}`, (data) => {
      this.setState({ numsOfReviews: data });
    });
  }

  getNeighborhoodInfo() {
    $.get(`/api/about/neighborhood/${this.state.listingId}`, (data) => {
      let neighborhoodInfo = JSON.parse(data);
      let lon_location = neighborhoodInfo[0].lon_location;
      let lat_location = neighborhoodInfo[0].lat_location;
      // let location = {lon_location, lat_location};
      this.setState({ neighborhoodInfo: neighborhoodInfo[0] });
    });
  }

  reviewOrReviews() {
    if (this.state.numsOfReviews === 1) {
      this.setState({ reviewWording: 'review' });
    }
  }

  verifiedOrNot() {
    if (this.state.host.verified === 1) {
      return <span>Verified</span>
    }
  }

  responseTimeConvertor() {
    if (this.state.host.response_time <= 59) {
      return <span className="boldingWords">Within an hour</span>
    }
    return <span className="boldingWords">Within a day</span>
  }

  render() {
    return (
      <div>
        <span styleName='title'>Hosted By {this.state.host.first_name}</span>
        <span><img styleName='hostImg' src={`https://pm1.narvii.com/6353/633f430ab321b7fdd7c2d7162426b8a02bc9cf68_hq.jpg`}/></span>
        <HostInfo host={this.state.host} joinMonth={this.state.joinMonth} joinYear={this.state.joinYear} reviews={this.state.numsOfReviews} reviewWording={this.state.reviewWording} verifiedOrNot={this.verifiedOrNot}/>

        <HostDescription host={this.state.host} responseTimeConvertor={this.responseTimeConvertor} />
        <ContactAirbnb />
        {this.state.neighborhoodInfo && <Neighborhood neighborhoodInfo={this.state.neighborhoodInfo} lat={this.state.neighborhoodInfo.lat_location } lng={this.state.neighborhoodInfo.lon_location} zoom='11' /> }



      </div>
    );
  }
}

export default CSSModules(App, styles);
