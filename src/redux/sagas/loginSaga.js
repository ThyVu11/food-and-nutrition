import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    yield put({ type: 'CLEAR_LOGIN_ERROR' }); 
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    yield axios.post('/api/user/login', action.payload, config);
    window.location.replace("http://localhost:3000/home");
    yield put({ type: 'FETCH_USER' });

  } catch (error) {
    console.log('Error with user login:', error);
    if (error.response.status === 401) {
      yield put({ type: 'LOGIN_FAILED' });
    } else {
      console.log('Unexpected error during login:', error);
      yield put({ type: 'LOGIN_FAILED_NO_CODE' });
    }
  }
}

function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.post('/api/user/logout', config);
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
