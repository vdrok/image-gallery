import { SET_IMAGES } from '../constants';

const initialState = { images: [] };

export default function setBrowserInfo(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES:
      return {
        ...state,
        images: action.images,
      };
    default:
      return state;
  }
}
