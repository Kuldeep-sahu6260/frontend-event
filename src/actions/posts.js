import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST, COMMENT } from '../constants/actionTypes';

import * as api from '../api/index.js';


//remmmeber this is slitly differnet from simple action here we are using redux thunk so its slitly differnet
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
    console.log(data,"hello");

    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type : START_LOADING})
    const { data } = await api.fetchPosts(page);
   

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type : END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};


export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  console.log(searchQuery);
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    console.log(data,"hell")

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
   
  } catch (error) {
    console.log(error);
  }
};



export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({type : START_LOADING});
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
