import {History} from 'history';
import {combineReducers} from 'redux';
import {connectRouter, RouterState} from 'connected-react-router';
import {ICardsState} from './cards/types';
import {cardsReducer} from './cards/reducer';
import {IGameState} from './game/types';
import {gameReducer} from './game/reducer';


export interface ApplicationState {
    cards: ICardsState;
    game: IGameState;
    router: RouterState;
}

const createRootReducer = (history: History) =>
    combineReducers({
        cards: cardsReducer,
        game: gameReducer,
        router: connectRouter(history)
    });

export default createRootReducer;