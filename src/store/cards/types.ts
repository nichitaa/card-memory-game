export enum CardsActionTypes {
    TOGGLE_LOADING = '@@CARD/TOGGLE_LOADING',
    FETCH_REQUEST_SUCCESS = '@@CARD/FETCH_REQUEST_SUCCESS',
    FETCH_REQUEST_ERROR = '@@CARD/FETCH_REQUEST_ERROR',
    SHUFFLE_CARDS = '@@CARD/SHUFFLE_CARDS',
    TOGGLE_RETRO_IMAGES = '@@CARD/TOGGLE_RETRO_IMAGES'
}

export type CardsAction = {
    readonly type: CardsActionTypes;
    readonly payload?: any;
}

export interface ICardsState {
    loading: boolean,
    error: null | string,
    cards: object[],
    isRetro: boolean
}