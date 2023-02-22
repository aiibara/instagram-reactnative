import { View, Text, Image, StyleSheet } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import Carousel from 'react-native-snap-carousel'
import { screenWidth } from './shared'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import ParsedText from 'react-native-parsed-text'
import { IPost } from '../models/interface'
import { TabProps } from '../screens/Main'
import { CompositeNavigationProp } from '@react-navigation/native'
import { RootStackProps } from '../App'




   export type PostProps = {
      navigation: CompositeNavigationProp<TabProps, RootStackProps>,
      post: IPost
   }


const CPost:FunctionComponent<PostProps> = ({navigation, post}) => {
   const [profilePicError, setProfilePicError] = useState<Boolean>(false)
   return (
      <View>
         <View style={styles.postHeaderContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
               <Image source={{ uri: !profilePicError ? post.user.profilePic : "https://picsum.photos/100/100" }} style={styles.postProfilePic} onError={()=>setProfilePicError(true)} />
               <View style={{ paddingLeft: 8 }}>
                  <Text style={styles.postUsername} numberOfLines={1}>{post.user.userName}</Text>
                  {!!post.location && <Text style={styles.postLocation} numberOfLines={1}>{post.location}</Text> }
               </View>
            </View>

            <Icon name="ellipsis-horizontal" color={'#000'} />
         </View>

         <Carousel
            data={post.images}
            renderItem={({ item, index }) => {
               return (
                  <View style={{ backgroundColor: 'black', width: screenWidth, height: 'auto' }}>
                     <Image source={{ uri: item }} style={{ height: 300 }} resizeMode={'cover'} />
                  </View>
               )
            }}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layout={'default'}
         />
         <View style={{ paddingHorizontal: 12, paddingVertical: 5 }}>
            <View style={styles.postActionsContainer}>
               <TouchableOpacity>
                  <Icon name="heart-outline" color={'#000'} size={25} />
               </TouchableOpacity>
               <TouchableOpacity style={{ marginHorizontal: 10 }}>
                  <Icon name="chatbubble-outline" color={'#000'} size={22} />
               </TouchableOpacity>
               <TouchableOpacity>
                  <Icon name="paper-plane-outline" color={'#000'} size={22} />
               </TouchableOpacity>
            </View>
         </View>
         <View style={{ paddingHorizontal: 12 }}>
            <Text style={styles.postUsername}>{post.user.userName} <ParsedText
               parse={
                  [
                     { pattern: /\@([A-z]*)/i, style: styles.touchableText, onPress: () => navigation.navigate('Search') },
                     { pattern: /#(\w+)/, style: styles.touchableText, onPress: () => navigation.navigate('Search') },
                  ]
               }

            >{post.caption}</ParsedText></Text>
         </View>
      </View>
   )
}

export default CPost

const styles = StyleSheet.create({ 
   postHeaderContainer: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   postProfilePic: {
      width: 35,
      height: 35,
      borderRadius: 20
   },
   postUsername: {
      fontSize: 14
   },
   postLocation: {
      fontSize: 12
   },
   postActionsContainer: {
      flexDirection: 'row',

   },
   touchableText: {
      color: 'blue'
   }
})