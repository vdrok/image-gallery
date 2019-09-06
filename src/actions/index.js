import {
  GET_IMAGES_SAGA,
  SET_IMAGES,
  SET_FAVORITE,
  SET_PAGE_COUNT,
  SET_PER_PAGE,
} from '../constants';

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

export function setPageCount(n) {
  return {
    type: SET_PAGE_COUNT,
    n,
  };
}

export function setPerPage(n) {
  return {
    type: SET_PER_PAGE,
    n,
  };
}

// Sagas
export function getImagesSaga() {
  return {
    type: GET_IMAGES_SAGA,
  };
}
