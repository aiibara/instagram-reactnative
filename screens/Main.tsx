import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FunctionComponent } from 'react';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { RootStackProps } from '../App';
import { CompositeNavigationProp } from '@react-navigation/native';

export type BottomTabParamList = {
   Home: undefined;
   Search: undefined;
 }

export type TabProps = BottomTabNavigationProp<BottomTabParamList>

const Tab = createBottomTabNavigator<BottomTabParamList>();

export type MainProps = {
   navigation: CompositeNavigationProp<TabProps, RootStackProps>
}
 
const Main: FunctionComponent<MainProps> = ({ navigation }) => {
   return (
      <Tab.Navigator screenOptions={{
         tabBarShowLabel: false,
         tabBarActiveTintColor: '#000',
         tabBarInactiveTintColor: '#000'
      }}>
         <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
               tabBarIcon: ({ color, focused }) => (
                  <Icon name={focused ? "home" : "home-outline"} size={30} color={color} />
               ),
               headerRightContainerStyle: { paddingRight: 10 },
               headerTitle: "",
               headerRight: () => (
                  <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 10, width: 120 }}>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={{ marginRight: 30 }}
                     >
                        <Icon name="heart-outline" color="#000" size={25} />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Messages')}
                     >
                        <Icon name="chatbubble-ellipses-outline" color="#000" size={22} />
                     </TouchableOpacity>
                  </View>
               )
            }}
         />
         <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
               tabBarIcon: ({ color, size, focused }) => (
                  <Icon name={focused ? "search" : "search-outline"} size={30} color={color} />
               )
            }}
         />
      </Tab.Navigator>
   )
}

export default Main;


function HomeHeader() {
   return (
      <View>
         <Text>Main</Text>
      </View>
   )
}