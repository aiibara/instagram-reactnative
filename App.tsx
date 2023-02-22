import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import Main, { BottomTabParamList } from './screens/Main';
import MessagesScreen from './screens/MessagesScreen';
import NotificationScreen from './screens/NotificationScreen';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';


export type RootStackParamList = {
  Main: NavigatorScreenParams<BottomTabParamList>;
  Notifications: undefined;
  Messages: undefined;
}

export type RootStackProps = NativeStackNavigationProp<RootStackParamList, "Main">

function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}


export default App;
