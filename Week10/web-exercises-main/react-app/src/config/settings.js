export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
};

export const ENDPOINTS = {
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments',
};

export const APP_CONFIG = {
  RECORDS_PER_PAGE: 5,
  PAGE_OPTIONS: [5, 10, 15, 25],
};

export const FORM_RULES = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 60,
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_PATTERN: /^[\d\s\-\(\)\.]+$/,
};

export const NOTIFICATION_TIMEOUT = 3500;
