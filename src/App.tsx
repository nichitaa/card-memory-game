import React, {Suspense} from 'react';
import {Store} from 'redux';
import {ApplicationState} from './store/createRootReducer';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {History} from 'history';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import Game from './pages/Game';
import GlobalFonts from './fonts/fonts';

const AppLayout = styled.div`
  background: rgba(239, 252, 213, 1);
  width: 100%;
  min-height: 100vh;
  padding: 10px;
`;

interface MainProps {
    store: Store<ApplicationState>;
    history: History;
}


const App: React.FC<MainProps> = ({store, history}) => {
    return <Provider store={store}>
        <ConnectedRouter history={history}>
            <GlobalFonts/>
            <AppLayout>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Switch>
                        <Route path={'/'} exact render={() => <Game/>}/>
                    </Switch>
                </Suspense>
            </AppLayout>
        </ConnectedRouter>
    </Provider>;
};

export default App;
