import React, { FunctionComponent, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import { IPost } from '../models/interface';
import CParseText from './CParseText';
import CProfilePic from './CProfilePic';
import { Color, screenWidth } from './shared';

export type PostProps = {
   navigation: any,
   post: IPost
}

const CPost: FunctionComponent<PostProps> = ({ post: _post, navigation }) => {
   const [post, setPost] = useState<IPost>(_post); //set post passed to state/redux

   const toggleLikePost = () => {
      setPost(prevState => ({ ...prevState, userHasLiked: !prevState.userHasLiked }))
   }

   console.log(navigation)

   if (post) {
      return (
         <View style={{ marginVertical: 10 }}>
            <View style={styles.postHeaderContainer}>
               <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <CProfilePic uri={post.user.profilePic} diameter={40} hasStory={post.user.hasStory} />

                  <View style={{ paddingLeft: 8 }}>
                     <Text style={styles.postUsername} numberOfLines={1}>{post.user.userName}</Text>
                     {!!post.location && <Text style={styles.postLocation} numberOfLines={1}>{post.location}</Text>}
                  </View>
               </View>

               <Icon name="ellipsis-horizontal" color={Color.gray} />
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
                  <TouchableOpacity onPress={toggleLikePost}>
                     <Icon name={post.userHasLiked ? "heart" : "heart-outline"} color={post.userHasLiked ? Color.red : Color.black} size={25} />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('Comments', { post: post })}>
                     <Icon name="chatbubble-outline" color={Color.black} size={22} />
                  </TouchableOpacity>

                  <TouchableOpacity>
                     <Icon name="paper-plane-outline" color={Color.black} size={22} />
                  </TouchableOpacity>
               </View>
            </View>

            <View style={{ paddingHorizontal: 12 }}>
               <Text style={styles.postUsername}>{post.user.userName} <CParseText>{post.caption}</CParseText></Text>
            </View>
         </View>
      )
   } else {
      return null
   }
}

export default CPost

const styles = StyleSheet.create({
   postHeaderContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   postUsername: {
      fontSize: 13,
      lineHeight: 18,
      fontWeight: '600'
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