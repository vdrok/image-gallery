import PropTypes from 'prop-types';
import React, { Component } from 'react';

import favoriteIcon from '../images/icon-favorite.png';
import notFavoriteIcon from '../images/icon-unfavorite.png';
import hoverFavoriteIcon from '../images/icon-hover-favorite.png';

class FavoriteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: this.props.hover,
    };
  }

  render() {
    const { isFavorite, id, onClick } = this.props;
    const { hover } = this.state;
    return (
      <div
        title="Select"
        className="ReactGridGallery_tile-icon"
        onClick={onClick ? () => onClick(id) : null}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseOut={() => this.setState({ hover: false })}
      >
        {isFavorite && <img src={favoriteIcon} alt="favoriteIcon" />}
        {!isFavorite && hover && <img src={hoverFavoriteIcon} alt="favoriteIcon" />}
        {!isFavorite && !hover && <img src={notFavoriteIcon} alt="favoriteIcon" />}
      </div>
    );
  }
}

FavoriteButton.propTypes = {
  id: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

FavoriteButton.defaultProps = {
  isFavorite: false,
  hover: false,
};

export default FavoriteButton;
