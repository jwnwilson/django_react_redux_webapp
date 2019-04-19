import {
  GET_API_DATA,
  GET_BLOG_DATA,
  COMPONENT_UPDATED,
  COMPONENT_NEEDS_UPDATE,
} from './actionTypes';

export function getApiData(id) {
  return { type: GET_API_DATA, id };
}

export function updateComponent() {
  return { type: COMPONENT_NEEDS_UPDATE };
}

export function componentUpdated() {
  return { type: COMPONENT_UPDATED };
}

export function getApiBlogData(offset, limit) {
  return { type: GET_BLOG_DATA, offset, limit };
}
