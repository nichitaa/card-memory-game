import React from 'react';
import {render} from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import './index.css';
import {history, store} from './store';

const app = <App store={store} history={history}/>;
render(app, document.getElementById('root'));

