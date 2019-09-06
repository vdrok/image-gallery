import { GET_IMAGES_SAGA, SET_IMAGES, SET_FAVORITE } from '../constants';

export function setImages(images) {
  return {
    type: SET_IMAGES,
    images,
  };
}

export function setFavorite(id) {
  return {
    type: SET_FAVORITE,
    id,
  };
}

// Sagas
export function getImagesSaga() {
  return {
    type: GET_IMAGES_SAGA,
  };
}
