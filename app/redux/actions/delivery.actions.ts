import { SET_NUMBER_OF_IBEACONS, SET_SELECTED_PRICE } from "./action.types";

export const setSelectedPrice = (selectedPrice: number) => ({
    type: SET_SELECTED_PRICE,
    payload: selectedPrice,
  });

  export const setNumberOfBeaconsOrderd = (numberOfBeacons: number) => ({
    type: SET_NUMBER_OF_IBEACONS,
    payload: numberOfBeacons,
  });