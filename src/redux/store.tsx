import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastrReducer } from 'react-redux-toastr';
import tripReducer from '@/redux/slices/tripsSlice';
import vehiclesSlice from '@/redux/slices/vehiclesSlice';
import rootSaga from '@/redux/sagas/rootSaga';
import authSlice from '@/redux/slices/authSlice';
import profileSlice from '@/redux/slices/profileSlice';
import pageLoaderSlice from '@/redux/slices/pageLoader';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  tripReducer,
  vehiclesSlice,
  authSlice,
  profileSlice,
  pageLoaderSlice,
  toastr: toastrReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const { dispatch } = store;

export { store, dispatch };
