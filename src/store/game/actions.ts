import {Action, Dispatch} from 'redux';
import {GameActionTypes, LOCAL_STORAGE_KEY} from './types';
import {ApplicationState} from '../createRootReducer';
import {shuffleCards} from '../cards/actions';


export const updateGameScore = (id: number) => (dispatch, getState: () => ApplicationState) => {
    const {game: {selected}} = getState();
    const exists = selected.find(el => el === id);
    dispatch(shuffleCards());
    if (exists) {
        dispatch(resetScore());
    } else {
        dispatch(updateScore(id));
    }
};

export const resetScore = () => (dispatch: Dispatch, getState: () => ApplicationState): Action => {
    const {game: {currentScore, bestScore}} = getState();
    if (currentScore >= bestScore) {
        const storageScores = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storageScores) {
            const arr: number[] = JSON.parse(storageScores);
            arr.push(currentScore);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([currentScore]));
        }
        dispatch({type: GameActionTypes.UPDATE_BEST_SCORE});
    }
    dispatch({type: GameActionTypes.TOGGLE_END_GAME_MODAL, payload: {bool: true, score: currentScore}});
    return dispatch({type: GameActionTypes.RESET_CURRENT_SCORE});
};

export const updateScore = (id: number) => (dispatch: Dispatch, getState: () => ApplicationState): Action | void => {
    dispatch({type: GameActionTypes.UPDATE_CURRENT_SCORE, payload: id});
    const {game: {currentScore, bestScore}} = getState();
    if (currentScore >= bestScore) {
        return dispatch({type: GameActionTypes.UPDATE_BEST_SCORE});
    }
};

export const getBestGameScore = () => (dispatch: Dispatch): Action | void => {
    const storageScores = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageScores) {
        const arr: number[] = JSON.parse(storageScores);
        return dispatch({type: GameActionTypes.UPDATE_BEST_SCORE_INITIAL, payload: Math.max(...arr)});
    }
};


export const toggleEndGameModal = (bool: boolean) => (dispatch: Dispatch): Action => {
    return dispatch({type: GameActionTypes.TOGGLE_END_GAME_MODAL, payload: {bool: bool, score: 0}});
};


export const resetCurrentScore = () => (dispatch: Dispatch): Action => {
    return dispatch({type: GameActionTypes.RESET_CURRENT_SCORE});
};



