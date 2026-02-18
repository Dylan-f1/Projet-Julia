import { Platform } from 'react-native';

const LOCAL_IP = '192.168.189.204';

const ENV = {
  apiUrl: Platform.select({
    web: 'http://localhost:5000/api',
    default: `http://${LOCAL_IP}:5000/api`,
  }),
  wsUrl: Platform.select({
    web: 'ws://localhost:5000',
    default: `ws://${LOCAL_IP}:5000`,
  }),
};

export default ENV;