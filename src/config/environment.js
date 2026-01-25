import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000/api',
    wsUrl: 'ws://localhost:3000'
  },
  staging: {
    apiUrl: 'https://staging-api.julia-app.com/api',
    wsUrl: 'wss://staging-api.julia-app.com'
  },
  prod: {
    apiUrl: 'https://api.julia-app.com/api',
    wsUrl: 'wss://api.julia-app.com'
  }
};

const getEnvVars = (env = Constants.expoConfig?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars();
