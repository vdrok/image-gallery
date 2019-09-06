import { SET_IMAGES } from '../constants';

const initialState = { images: [] };

export default function setBrowserInfo(state = initialState, action) {
  let images = [];
  switch (action.type) {
    case SET_IMAGES:
      images = action.images.map(image => {
        image.src = image.url;
        image.thumbnail = image.thumbnailUrl;
        image.alt = 'gallery';
        image.isFavorite = false;
        return image;
      });
      return {
        ...state,
        images,
      };
    default:
      return state;
  }
}
