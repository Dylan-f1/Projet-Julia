import { Slot } from 'expo-router';
import { AuthProvider } from '../src/contexts/AuthContext';
import { ChatProvider } from '../src/contexts/ChatContext';
import '../global.css';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Slot />
      </ChatProvider>
    </AuthProvider>
  );
}
