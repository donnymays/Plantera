import { TOGGLE_FAVORITE } from '../actions/plants'
import PLANTS from '../../data/seed-data';

const initialState = {
  plants: PLANTS, 
  favoritePlants: []
};

const plantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoritePlants.findIndex(
        plant => plant.id === action.plantId
      );
    if (existingIndex >= 0) {
      const updatedFavPlants = [...state.favoritePlants];
      updatedFavePlants.splice(existingIndex, 1);
      return { ...state, favoritePlants: updatedFavPlants };
    } else {
      const plant = state.plants.find(plant => plant.id === action.plantId);
      return { ...state, favoritePlants: state.favoritePlants.concat(plant) };
    }
    default:
      return state;
  }
}


export default plantsReducer;