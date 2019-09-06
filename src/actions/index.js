import { GET_IMAGES_SAGA, SET_IMAGES } from '../constants';

export function setImages(images) {
  return {
    type: SET_IMAGES,
    images,
  };
}

// Sagas
export function getImagesSaga() {
  return {
    type: GET_IMAGES_SAGA,
  };
}
