import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Gallery from '../../components/Gallery';
import { getImagesSaga } from '../../actions';

class Home extends Component {
  componentDidMount() {
    this.props.getImagesSaga();
  }

  render() {
    const { images } = this.props;
    const imgs = images.slice(0, 20);
    return (
      <div className="container">
        <Gallery images={imgs} />
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
};

Home.defaultProps = {
  images: null,
  getImagesSaga: null,
};

const mapStateToProps = state => ({
  images: state.imagesReducer.images,
});

const mapDispatchToProps = dispatch => ({
  getImagesSaga: () => dispatch(getImagesSaga()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
