import * as actions from '../src/actions'
import * as types from '../src/constants'

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const images = [
    	{
    		albumId: 1,
			alt: "gallery",
			id: 1,
			isFavorite: false,
			marginLeft: -1,
			scaletwidth: 180,
			src: "https://via.placeholder.com/600/92c952",
			thumbnail: "https://via.placeholder.com/150/92c952",
			thumbnailUrl: "https://via.placeholder.com/150/92c952",
			title: "accusamus beatae ad facilis cum similique qui sunt",
			url: "https://via.placeholder.com/600/92c952",
			vwidth: 177
    	},
    	{
    		albumId: 1,
			alt: "gallery",
			id: 2,
			isFavorite: false,
			marginLeft: -1,
			scaletwidth: 180,
			src: "https://via.placeholder.com/600/771796",
			thumbnail: "https://via.placeholder.com/150/771796",
			thumbnailUrl: "https://via.placeholder.com/150/771796",
			title: "reprehenderit est deserunt velit ipsam",
			url: "https://via.placeholder.com/600/771796",
			vwidth: 177
    	}
    ]
    const expectedAction = {
      type: types.SET_IMAGES,
      images
    }
    expect(actions.setImages(images)).toEqual(expectedAction)
  })
})