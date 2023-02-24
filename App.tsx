import React from 'react';
import Main from './screens/Main';
import MessagesScreen from './screens/MessagesScreen';
import NotificationScreen from './screens/NotificationScreen';
import { NavigationContainer } from '@react-navigation/native';
import CommentScreen from './screens/CommentScreen';
import { RootStackParamList } from './models/types';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './redux/store';


const Stack = createStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Notifications" component={NotificationScreen} />
          <Stack.Screen name="Messages" component={MessagesScreen} />
          <Stack.Screen name="Comments" component={CommentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}


export default App;
