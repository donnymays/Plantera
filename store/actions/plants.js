export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id }
};

export const ADD_PLANT = 'ADD_PLANT';

export const addPlant = (id) => {
  return { type: ADD_PLANT, plantId: id }
}