import { GET_DATA_SUCCESS, BLOG_RECEIVED } from '../actions/actionTypes';

function components(state = [], action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return action.data.modules;
    default:
      return state;
  }
}

function header(state = null, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return action.data.header || null;
    default:
      return state;
  }
}

function footer(state = null, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return action.data.footer || null;
    default:
      return state;
  }
}

function blogs(state = {}, action) {
  switch (action.type) {
    case BLOG_RECEIVED:
      return action.data || {};
    default:
      return state;
  }
}

export default {
  components,
  header,
  footer,
  blogs,
};
