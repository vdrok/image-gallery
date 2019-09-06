import { SET_IMAGES, SET_FAVORITE } from '../constants';

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
        loaded: true,
      };
    case SET_FAVORITE:
      images = state.images.map(image => {
        if (image.id === action.id) {
          image.isFavorite = !image.isFavorite;
        }
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
