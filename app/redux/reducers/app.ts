import { APP_STATE_ACTIVE, APP_STATE_BACKGROUND } from '../actions/action.types';

const defaultState = {
  state: undefined,
};

export const app = (state = defaultState, action: any) => {
  switch (action.type) {

    case APP_STATE_ACTIVE:
    case APP_STATE_BACKGROUND: {
      return {
        ...state,
        state: action.type,
      };
    }

    default: {
      return state;
    }
  }
};
