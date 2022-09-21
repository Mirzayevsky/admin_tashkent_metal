import actionTypes from "../../../constants/actionTypes";
import langs from "../../../constants/lang";

const defaultState = langs.UZBEK;

export const langReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_TO_UZBEK:
      return langs.UZBEK;
    case actionTypes.SWITCH_TO_RUSSIAN:
      return langs.RUSSIAN;
    case actionTypes.TOGGLE_LANG:
      return state === langs.UZBEK
        ? langs.RUSSIAN
        : state === langs.RUSSIAN
        ? langs.UZBEK
        : state;
    default:
      return state;
  }
};
