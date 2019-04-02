import { createStore } from 'redux';
import todoApp from './store/reducers';

let store = createStore(todoApp);

export default store;