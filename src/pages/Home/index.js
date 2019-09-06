import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getImagesSaga, setFavorite } from '../../actions';
import Gallery from '../../components/Gallery';

class Home extends Component {
  componentDidMount() {
    this.props.getImagesSaga();
  }

  getFavorite = images => {
    let favorites = 0;
    if (images.length === 0) {
      return favorites;
    }
    Object.keys(images).forEach(i => {
      if (images[i].isFavorite) {
        favorites += 1;
      }
    });
    return favorites;
  };

  render() {
    const { images } = this.props;
    const imgs = images.slice(0, 20);
    const favorites = this.getFavorite(images);
    return (
      <div className="container">
        <div className="show-favorite">
          <span>Your favorite photos: </span>
          <span>{favorites}</span>
        </div>
        <Gallery images={imgs} onSelectImage={this.props.setFavorite} />
      </div>
    );
  }
}

Home.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string,
      isFavorite: PropTypes.bool,
    }),
  ),
  getImagesSaga: PropTypes.func,
  setFavorite: PropTypes.func,
};

Home.defaultProps = {
  images: null,
  getImagesSaga: null,
  setFavorite: null,
};

const mapStateToProps = state => ({
  images: state.imagesReducer.images,
});

const mapDispatchToProps = dispatch => ({
  getImagesSaga: () => dispatch(getImagesSaga()),
  setFavorite: id => dispatch(setFavorite(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
