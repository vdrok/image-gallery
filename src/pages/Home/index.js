import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Loader from 'react-loader-spinner';

import { getImagesSaga, setFavorite, setPerPage } from '../../actions';
import Gallery from '../../components/Gallery';

import './styles.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 0,
      perPage: 20,
    };
  }

  componentDidMount() {
    const { perPage } = this.props;
    if (!perPage) {
      this.props.setPerPage(this.state.perPage);
    }
    this.props.getImagesSaga();
  }

  handlePageClick = data => {
    const { selected } = data;
    this.setState({
      currentPage: selected,
    });
  };

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
    const { images, pageCount, perPage, loaded } = this.props;
    const offset = this.state.currentPage * perPage;
    const endset = (this.state.currentPage + 1) * perPage;
    const imgs = images.slice(offset, endset);
    const favorites = this.getFavorite(images);
    return (
      <div className="container">
        {loaded && imgs.length > 0 && (
          <>
            <div className="show-favorite">
              <span>Your favorite photos: </span>
              <span>{favorites}</span>
            </div>
            <Gallery images={imgs} onSelectImage={this.props.setFavorite} />
            <div className="pagination-wrapper">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageClick}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
              />
            </div>
          </>
        )}
        {!loaded && <Loader type="Circles" color="#00BFFF" height={100} width={100} />}
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
  loaded: PropTypes.bool,
  perPage: PropTypes.number,
  pageCount: PropTypes.number,
  setPerPage: PropTypes.func,
};

Home.defaultProps = {
  images: null,
  getImagesSaga: null,
  setFavorite: null,
  loaded: false,
  perPage: 0,
  setPerPage: null,
  pageCount: 0,
};

const mapStateToProps = state => ({
  images: state.imagesReducer.images,
  perPage: state.imagesReducer.perPage,
  pageCount: state.imagesReducer.pageCount,
  loaded: state.imagesReducer.loaded,
});

const mapDispatchToProps = dispatch => ({
  getImagesSaga: () => dispatch(getImagesSaga()),
  setFavorite: id => dispatch(setFavorite(id)),
  setPerPage: n => dispatch(setPerPage(n)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
