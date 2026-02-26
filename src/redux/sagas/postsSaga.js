import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchAllPost() {
  try {
    const response = yield axios.get(`/api/post`);
    yield put({
      type: "SET_ALL_POST",
      payload: response.data,
    });
  } catch (error) {
    console.log("Post is error:", error);
  }
}

function* addPost(action) {
  try {
    console.log(action.payload.file);
    let postObj = {
      text: action.payload.text,
      time: action.payload.time.toUTCString(),
    };

    if (action.payload.file.length === 0) {

      yield axios.post(`/api/post/withoutImage`, action.payload);
    } else {
      const data = new FormData();

      action.payload.file.map((file) => 
        data.append("file",file)
      );

      for (const [key, value] of Object.entries(postObj)) {
        data.append(key, value);
      }

      console.log("----------->data", data);
      // console.log('----------->item data', text);
      // console.log('add this post', action.payload);

      yield axios.post(`/api/post/withImage`, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": action.payload.file.type,
        },
      });
    }

    // yield axios.post(`/api/post`, action.payload);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("addPost is error:", error);
  }
}

function* editPost(action) {
  try {
    yield axios.put(`/api/post`, action.payload);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("editPost is error:", error);
  }
}

function* deletePost(action) {
  try {
    yield axios.delete(`/api/post/${action.payload.id}`);
    yield put({
      type: "FETCH_ALL_POSTS",
    });
  } catch (error) {
    console.log("deletePayment is error:", error);
  }
}

function* postsSaga() {
  yield takeLatest("FETCH_ALL_POSTS", fetchAllPost);
  yield takeLatest("ADD_POST", addPost);
  yield takeLatest("EDIT_POST", editPost);
  yield takeLatest("DELETE_POST", deletePost);
}

export default postsSaga;
