import Plant from '../../models/plant';
import { format } from 'date-fns';
import { useState } from 'react';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const ADD_PLANT = 'ADD_PLANT';
export const SET_PLANTS = 'SET_PLANTS';
export const UPDATE_PLANT = 'UPDATE_PLANT'


export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, plantId: id }
};

export const fetchPlants = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://plantera-46325-default-rtdb.firebaseio.com/plants.json');
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      
      const resData = await response.json();
      const loadedPlants = [];
  
        for (const key in resData) {
          loadedPlants.push(
            new Plant(
              key,
              resData[key].name,
              resData[key].type,
              resData[key].imageUrl,
              resData[key].dateReceived,
              resData[key].waterDate,
              resData[key].notes
            )
          );
        }

      dispatch({ type: SET_PLANTS, plants: loadedPlants });
    } catch (err) {
      throw err;
    }
  };
};

export const addPlant = (plant) => {
  const { name, type, imageUrl, dateReceived, waterDate, notes } = plant
  return async dispatch => {
    const response = await fetch('https://plantera-46325-default-rtdb.firebaseio.com/plants.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      })
    });
  
    const resData = await response.json();

    dispatch({ 
      type: ADD_PLANT, 
      plantData: { 
        id: resData.name,
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      } 
    });
  };
};

export const updatePlant = (id, name, type, imageUrl, dateReceived, waterDate, notes) => {
  // const { name, type, imageUrl, dateReceived, waterDate, notes } = plant
  return async dispatch => {
    const response = await fetch(
      `https://plantera-46325-default-rtdb.firebaseio.com/plants/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PLANT,
      pid: id,
      planttData: {
        name,
        type,
        imageUrl,
        dateReceived,
        waterDate,
        notes
      }
    });
  };
};

export const waterPlant = (id) => {
  const updatedWaterDate = format(new Date(), 'MM/dd/yyyy')
  return async dispatch => {
    const response = await fetch(
      `https://plantera-46325-default-rtdb.firebaseio.com/plants/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        waterDate
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PLANT,
      pid: id,
      planttData: {
        waterDate: updatedWaterDate
      }
    });
    console.log(updatedWaterDate);
  };
};