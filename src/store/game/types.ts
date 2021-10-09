export enum GameActionTypes {
    RESET_CURRENT_SCORE = '@@GAME/RESET_CURRENT_SCORE',
    UPDATE_CURRENT_SCORE = '@@GAME/UPDATE_CURRENT_SCORE',
    UPDATE_BEST_SCORE = '@@GAME/UPDATE_BEST_SCORE',
    UPDATE_BEST_SCORE_INITIAL = '@@GAME/UPDATE_BEST_SCORE_INITIAL',
    TOGGLE_END_GAME_MODAL = '@@GAME/TOGGLE_END_GAME_MODAL'
}

export type GameAction = {
    type: GameActionTypes,
    payload?: any
}

export interface IGameState {
    endGameModal: boolean,
    endGameScore: number,
    currentScore: number,
    bestScore: number,
    selected: number[]
}

export const LOCAL_STORAGE_KEY = 'poke_card_memory_game';