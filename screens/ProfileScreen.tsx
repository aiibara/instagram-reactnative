import { View, Text } from 'react-native'
import React from 'react'
import { useReduxSelector } from '../redux/store'
import { RouteProp, useRoute } from '@react-navigation/native'
import { BottomTabParamList } from '../models/types'

const ProfileScreen = () => {
    const {params: {user}} = useRoute<RouteProp<BottomTabParamList, 'Profile'>>();
  return (
    <View>
      <Text>ProfileScreen {user.fullName}</Text>
    </View>
  )
}

export default ProfileScreen