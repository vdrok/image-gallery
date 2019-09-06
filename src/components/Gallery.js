import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import Image from './Image';
import './styles.css';

function calculateCutOff(len, delta, items) {
  const cutoff = [];
  let cutsum = 0;

  Object.keys(items).forEach(i => {
    const item = items[i];
    const fractOfLen = item.scaletwidth / len;
    cutoff[i] = Math.floor(fractOfLen * delta);
    cutsum += cutoff[i];
  });

  let stillToCutOff = delta - cutsum;
  while (stillToCutOff > 0) {
    if (cutoff) {
      const n = cutoff.length;
      for (let i = 0; i < n; i += 1) {
        cutoff[i] += 1;
        stillToCutOff -= 1;
        if (stillToCutOff < 0) break;
      }
    }
  }
  return cutoff;
}

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      thumbnails: [],
      lightboxIsOpen: this.props.isOpen,
      currentImage: this.props.currentImage,
    };

    this.onResize = this.onResize.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.onClickImage = this.onClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.toggleLightbox = this.toggleLightbox.bind(this);
  }

  componentDidMount() {
    this.onResize();
  }

  componentWillReceiveProps(np) {
    if (this.state.currentImage > np.images.length - 1) {
      this.setState({ currentImage: np.images.length - 1 });
    }
    if (this.state.images !== np.images || this.props.maxRows !== np.maxRows) {
      this.setState({
        images: np.images,
        thumbnails: this.renderThumbs(this.gallery.clientWidth, np.images),
      });
    }
  }

  onResize() {
    if (!this.gallery) return;
    this.setState({
      thumbnails: this.renderThumbs(this.gallery.clientWidth),
    });
  }

  onClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return;
    this.gotoNext();
  }

  onSelectImage(index) {
    if (this.props.onSelectImage)
      this.props.onSelectImage.call(this, index, this.state.images[index]);
  }

  setThumbScale(item) {
    item.scaletwidth = this.props.rowHeight;
  }

  getOnClickThumbnailFn() {
    if (!this.props.onClickThumbnail && this.props.enableLightbox) return this.openLightbox;
    if (this.props.onClickThumbnail) return this.props.onClickThumbnail;
    return null;
  }

  openLightbox(index, event) {
    if (event) {
      event.preventDefault();
    }
    if (this.props.lightboxWillOpen) {
      this.props.lightboxWillOpen.call(this, index);
    }
    if (this.props.currentImageWillChange) {
      this.props.currentImageWillChange.call(this, index);
    }

    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    if (this.props.lightboxWillClose) {
      this.props.lightboxWillClose.call(this);
    }
    if (this.props.currentImageWillChange) {
      this.props.currentImageWillChange.call(this, 0);
    }

    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  toggleLightbox() {
    this.setState(state => ({ lightboxIsOpen: !state.lightboxIsOpen }));
  }

  buildImageRow(items, containerWidth) {
    const row = [];
    let len = 0;
    const imgMargin = 2 * this.props.margin;
    while (items.length > 0 && len < containerWidth) {
      const item = items.shift();
      row.push(item);
      len += item.scaletwidth + imgMargin;
    }

    const delta = len - containerWidth;
    if (row.length > 0 && delta > 0) {
      const cutoff = calculateCutOff(len, delta, row);
      Object.keys(row).forEach(i => {
        const pixelsToRemove = cutoff[i];
        const item = row[i];
        item.marginLeft = -Math.abs(Math.floor(pixelsToRemove / 2));
        item.vwidth = item.scaletwidth - pixelsToRemove;
      });
    } else {
      Object.keys(row).forEach(j => {
        const item = row[j];
        item.marginLeft = 0;
        item.vwidth = item.scaletwidth;
      });
    }
    return row;
  }

  renderThumbs(containerWidth, images = this.state.images) {
    if (!images) return [];
    if (containerWidth === 0) return [];

    const items = images.slice();

    Object.keys(items).forEach(t => {
      this.setThumbScale(items[t]);
    });

    const thumbs = [];
    const rows = [];
    while (items.length > 0) {
      rows.push(this.buildImageRow(items, containerWidth));
    }

    Object.keys(rows).forEach(r => {
      Object.keys(rows[r]).forEach(i => {
        const item = rows[r][i];
        if (this.props.maxRows) {
          if (r < this.props.maxRows) {
            thumbs.push(item);
          }
        } else {
          thumbs.push(item);
        }
      });
    });
    return thumbs;
  }

  render() {
    const images = this.state.thumbnails.map((item, idx) => {
      return (
        <Image
          key={`Image-${item.src}`}
          item={item}
          index={idx}
          margin={this.props.margin}
          height={this.props.rowHeight}
          isSelectable={this.props.enableImageSelection}
          onClick={this.getOnClickThumbnailFn()}
          onSelectImage={this.onSelectImage}
          tileViewportStyle={this.props.tileViewportStyle}
          thumbnailStyle={this.props.thumbnailStyle}
        />
      );
    });
    return (
      <div id={this.props.id} className="ReactGridGallery" ref={c => (this.gallery = c)}>
        <iframe
          className="resize-iframe"
          title="Gallery"
          ref={c =>
            c && c.contentWindow && c.contentWindow.addEventListener('resize', this.onResize)
          }
        />
        {images}
        <ModalGateway>
          {this.state.lightboxIsOpen ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel views={this.props.images} currentIndex={this.state.currentImage} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

Gallery.displayName = 'Gallery';

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      thumbnail: PropTypes.string.isRequired,
      title: PropTypes.string,
      isFavorite: PropTypes.bool,
    }),
  ).isRequired,
  id: PropTypes.string,
  enableImageSelection: PropTypes.bool,
  onSelectImage: PropTypes.func,
  rowHeight: PropTypes.number,
  maxRows: PropTypes.number,
  margin: PropTypes.number,
  onClickThumbnail: PropTypes.func,
  lightboxWillOpen: PropTypes.func,
  lightboxWillClose: PropTypes.func,
  currentImageWillChange: PropTypes.func,
  enableLightbox: PropTypes.bool,
  currentImage: PropTypes.number,
  isOpen: PropTypes.bool,
  tileViewportStyle: PropTypes.func,
  thumbnailStyle: PropTypes.func,
};

Gallery.defaultProps = {
  id: 'ReactGridGallery',
  enableImageSelection: true,
  onSelectImage: null,
  rowHeight: 180,
  maxRows: 100,
  onClickThumbnail: null,
  lightboxWillOpen: null,
  lightboxWillClose: null,
  currentImageWillChange: null,
  margin: 2,
  enableLightbox: true,
  currentImage: 0,
  isOpen: false,
  tileViewportStyle: null,
  thumbnailStyle: null,
};

export default Gallery;
