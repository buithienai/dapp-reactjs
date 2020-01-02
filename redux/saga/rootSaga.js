import { all, fork } from 'redux-saga/effects';
import { watchApp } from './appSaga';

export default function* rootSaga() {
	yield all([
		fork(watchApp)
	]);
};