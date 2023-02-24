import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { FunctionComponent } from 'react';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabParamList, RootStackProps } from '../models/types';
import { Color } from '../components/shared';
import { useReduxDispatch, useReduxSelector } from '../redux/store';
import CProfilePic from '../components/CProfilePic';
import ProfileScreen from './ProfileScreen';

 
const Tab = createBottomTabNavigator<BottomTabParamList>();

const Main:FunctionComponent<RootStackProps<'Main'>> = ({navigation}) => {
   const user = useReduxSelector(state => state.user)
   return (
      <Tab.Navigator screenOptions={{
         tabBarShowLabel: false,
         tabBarActiveTintColor: Color.black,
         tabBarInactiveTintColor: Color.black
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
                        <Icon name="heart-outline" color={Color.black} size={25} />
                     </TouchableOpacity>
                     <TouchableOpacity
                        onPress={() => navigation.navigate('Messages')}
                     >
                        <Icon name="chatbubble-ellipses-outline" color={Color.black} size={22} />
                     </TouchableOpacity>
                  </View>
               )
            }}
         />
         <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
               tabBarIcon: ({ color, focused }) => (
                  <Icon name={focused ? "search" : "search-outline"} size={30} color={color} />
               )
            }}
         />

         <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            initialParams={{user: user}}
            options={{
               tabBarIcon: ({ color, focused }) => (
                  <CProfilePic uri={user.profilePic} diameter={40} hasStory={false} />
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