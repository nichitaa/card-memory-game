import {CardsAction, CardsActionTypes, ICardsState} from './types';
import {Reducer} from 'react';

export const initialState: ICardsState = {
    isRetro: false,
    loading: false,
    error: null,
    cards: []
};

const reducer: Reducer<ICardsState, CardsAction> = (state = initialState, action) => {
    switch (action.type) {
        case CardsActionTypes.TOGGLE_LOADING: {
            return {...state, loading: action.payload};
        }
        case CardsActionTypes.FETCH_REQUEST_ERROR: {
            return {...state, error: action.payload};
        }
        case CardsActionTypes.FETCH_REQUEST_SUCCESS: {
            return {...state, cards: action.payload};
        }
        case CardsActionTypes.SHUFFLE_CARDS: {
            return {...state, cards: action.payload};
        }
        case CardsActionTypes.TOGGLE_RETRO_IMAGES: {
            return {...state, isRetro: action.payload};
        }
        default: {
            return state;
        }
    }
};

export {reducer as cardsReducer};