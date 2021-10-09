import {GameAction, GameActionTypes, IGameState} from './types';
import {Reducer} from 'react';


export const initialState: IGameState = {
    endGameModal: false,
    endGameScore: 0,
    currentScore: 0,
    bestScore: 0,
    selected: []
};

export const reducer: Reducer<IGameState, GameAction> = (state = initialState, action) => {
    switch (action.type) {
        case GameActionTypes.RESET_CURRENT_SCORE: {
            return {...state, currentScore: 0, selected: []};
        }
        case GameActionTypes.UPDATE_BEST_SCORE: {
            return {...state, bestScore: state.currentScore};
        }
        case GameActionTypes.UPDATE_CURRENT_SCORE: {
            return {...state, currentScore: state.currentScore + 1, selected: [...state.selected, action.payload]};
        }
        case GameActionTypes.UPDATE_BEST_SCORE_INITIAL: {
            return {...state, bestScore: action.payload};
        }
        case GameActionTypes.TOGGLE_END_GAME_MODAL: {
            return {...state, endGameModal: action.payload.bool, endGameScore: action.payload.score};
        }
        default: {
            return state;
        }
    }
};

export {reducer as gameReducer};