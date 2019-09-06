import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FavoriteButton from './FavoriteButton';
import './styles.css';

class Image extends Component {
  tileViewportStyle() {
    if (this.props.tileViewportStyle) return this.props.tileViewportStyle.call(this);
    return {
      width: this.props.item.vwidth,
      height: this.props.height,
      overflow: 'hidden',
    };
  }

  thumbnailStyle() {
    if (this.props.thumbnailStyle) return this.props.thumbnailStyle.call(this);

    return {
      cursor: 'pointer',
      width: this.props.item.scaletwidth,
      height: this.props.height,
      marginLeft: this.props.item.marginLeft,
      marginTop: 0,
    };
  }

  renderFavoriteButton() {
    return (
      <FavoriteButton
        key="Select"
        id={this.props.item.id}
        isFavorite={this.props.item.isFavorite}
        onClick={this.props.onSelectImage}
      />
    );
  }

  render() {
    const alt = this.props.item.alt ? this.props.item.alt : '';

    const thumbnailProps = {
      key: `img-${this.props.index}`,
      src: this.props.item.thumbnail,
      title: this.props.item.title,
      style: this.thumbnailStyle(),
    };

    return (
      <div
        className="ReactGridGallery_tile"
        key={`tile-${this.props.index}`}
        style={{
          margin: this.props.margin,
        }}
      >
        <div className="ReactGridGallery_tile-icon-bar" key={`tile-icon-bar-${this.props.index}`}>
          {this.renderFavoriteButton()}
        </div>

        <div
          className="ReactGridGallery_tile-viewport"
          style={this.tileViewportStyle()}
          key={`tile-viewport-${this.props.index}`}
          onClick={
            this.props.onClick ? e => this.props.onClick.call(this, this.props.index, e) : null
          }
        >
          <img alt={alt} {...thumbnailProps} />
        </div>
      </div>
    );
  }
}

Image.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string,
    isFavorite: PropTypes.bool,
    vwidth: PropTypes.number,
    scaletwidth: PropTypes.number,
    marginLeft: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  margin: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  onSelectImage: PropTypes.func,
  tileViewportStyle: PropTypes.func,
  thumbnailStyle: PropTypes.func,
};

Image.defaultProps = {
  margin: 0,
  height: 0,
  onClick: null,
  onSelectImage: null,
  tileViewportStyle: null,
  thumbnailStyle: null,
};

export default Image;
