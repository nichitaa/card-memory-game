import {CardsActionTypes} from './types';
import {PokeApiService} from '../../services/api';
import {Action, Dispatch} from 'redux';
import {ApplicationState} from '../createRootReducer';
import {shuffleArray} from '../../utils';
import {resetCurrentScore} from '../game/actions';

export const initialCardsFetch = (limit?: number) => async (dispatch, getState: () => ApplicationState) => {
    try {
        dispatch({type: CardsActionTypes.TOGGLE_LOADING, payload: true});
        const api = PokeApiService.getInstance();

        const res = await api.fetchPokes(limit);
        const pokes: any = [];

        const promises: Promise<any>[] = [];
        for (let i = 0; i < res.length; i++) {
            promises.push(api.fetchSinglePoke(res[i].url));
        }

        Promise.all(promises).then(res => {
            const {cards: {isRetro}} = getState();
            res.map(el => pokes.push({
                name: el.name,
                img: isRetro ? el.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny : el.sprites.other.dream_world.front_default,
                id: el.id
            }));
            dispatch({type: CardsActionTypes.TOGGLE_LOADING, payload: false});
            dispatch({type: CardsActionTypes.FETCH_REQUEST_SUCCESS, payload: pokes});
            return dispatch(shuffleCards());
        });

    } catch (e) {
        dispatch({type: CardsActionTypes.FETCH_REQUEST_ERROR, payload: e.message});
        return dispatch({type: CardsActionTypes.TOGGLE_LOADING, payload: false});
    }
};


export const shuffleCards = () => (dispatch: Dispatch, getState: () => ApplicationState): Action => {
    const {cards: {cards}} = getState();
    const shuffled = shuffleArray(cards);
    return dispatch({type: CardsActionTypes.SHUFFLE_CARDS, payload: shuffled});
};


export const toggleCardRetroImages = (bool: boolean) => (dispatch) => {
    dispatch({type: CardsActionTypes.TOGGLE_RETRO_IMAGES, payload: bool});
    dispatch(resetCurrentScore());
    return dispatch(initialCardsFetch(24));
};