export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id }
};

export const ADD_PLANT = 'ADD_PLANT';

export const addPlant = (plant) => {
  const { id, name, type, imageUrl, dateReceived, waterDate, notes } = plant
  return { 
    type: ADD_PLANT, 
    plantData: { 
      id: id,
      name: name,
      type: type,
      imageUrl: imageUrl,
      dateReceived: dateReceived,
      waterDate: waterDate,
      notes: notes
     } 
  }
};
  
export const WATER_PLANT = 'WATER_PLANT';

export const waterPlant = (id) => {
  return { type: WATER_PLANT, plantId: id}
};
