import {
  COMPONENT_NEEDS_UPDATE,
  COMPONENT_UPDATED,
} from '../actions/actionTypes';

function componetUpdate(state = false, action) {
  switch (action.type) {
    case COMPONENT_NEEDS_UPDATE:
      return true;
    case COMPONENT_UPDATED:
      return false;
    default:
      return state;
  }
}

export default {
  componetUpdate,
};
