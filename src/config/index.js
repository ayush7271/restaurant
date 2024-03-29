const isDev = process.env.REACT_APP_NODE_ENV === 'development';

const config = isDev ? require('./constant.dev') : require('./constant.prod');

export default config;