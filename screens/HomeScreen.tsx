import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IPost, IStory } from '../models/interface';
import CPost from '../components/CPost';
import { MainProps } from '../models/types';
import { APIAdapter, Color } from '../components/shared';
import CProfilePic from '../components/CProfilePic';
import { useReduxDispatch, useReduxSelector } from '../redux/store';
import { setUser } from '../redux/reducer';
import Icon from 'react-native-vector-icons/Ionicons';

type StoryProps = { item: IStory, index: number };

const StoryItem = ({ item, index }: StoryProps) => {
   const user = useReduxSelector(state => state.user)
   if (index != 0) {
      return (
         <View style={styles.storyContainer}>
            <View style={styles.storyImageContainer}>
               <CProfilePic uri={item.user.profilePic} diameter={70} hasStory={true} />
            </View>
            <Text style={{}} numberOfLines={1}>{item.user.userName}</Text>
         </View>
      )

   } else {
      return (
         <View style={styles.storyContainer}>
            <View style={styles.storyImageContainer}>
               <CProfilePic uri={user.profilePic} diameter={70} hasStory={user.hasStory} />

               <View style={{position: 'absolute', backgroundColor: Color.lightBlue, borderRadius: 20, justifyContent:'center', alignItems:'center', borderWidth: 3, borderColor: '#fff', bottom: 0, right: 2}}>
                  <Icon name="add" size={20} color={'#fff'}/>
               </View>
            </View>
            <Text style={{}} numberOfLines={1}>{'Your Story'}</Text>
         </View>
      )
   }
};

const HomeScreen: FunctionComponent<MainProps<'Home'>> = ({ navigation }) => {


   const [stories, setStories] = useState<Array<IStory>>([])

   const [posts, setPosts] = useState<Array<IPost>>([])
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const user = useReduxSelector(state => state.user)
   const dispatch = useReduxDispatch()

   const fetchStories = async () => {
      const result = await APIAdapter.get("/stories")
      const resultStories: [IStory] = result.record.data.map((item: any) => {
         return {
            id: item.id,
            image: item.user.image,
            user: {
               userName: item.user.username,
               profilePic: item.user.profile_picture,
               id: item.user.id,
               fullName: item.user.full_name
            }
         }
      })
      return resultStories
   }

   const fetchPosts = async () => {
      setIsLoading(true)
      const result = await APIAdapter.get("/posts")
      const resultPosts: [IPost] = result.record.data.map((item: any) => {
         return {
            id: item.id,
            caption: item.caption.text,
            userHasLiked: item.user_has_liked,
            location: item.location,
            createdAt: new Date(parseInt(item.created_time)),
            type: item.type,
            images: [item.images.standard_resolution.url],
            user: {
               userName: item.user.username,
               profilePic: item.user.profile_picture,
               id: item.user.id,
               fullName: item.user.full_name
            }
         }
      })

      return resultPosts
   }

   const fetchData = async () => {
      setIsLoading(true)

      const [resultPosts, resultStories] = await Promise.all([
         fetchPosts(),
         fetchStories(),
      ])

      setStories([])
      setPosts([])

      const _resultStories = resultStories.filter(story => story.user.id != user.id);

      dispatch(setUser({
         ...user,
         hasStory: _resultStories.length != resultStories.length
      }))

      _resultStories.unshift({
         id: "none",
         image: "",
         user: user
      })
      setStories(_resultStories)
      setPosts(resultPosts)

      setIsLoading(false)
   }

   useEffect(() => {
      fetchData()
   }, [])

   console.log("stories..", stories)
   return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
         <ScrollView
            contentContainerStyle={{ backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchData} />}
         >
            <FlatList
               data={stories}
               renderItem={({ item, index }) => <StoryItem item={item} index={index} />}
               keyExtractor={item => item.id}
               horizontal={true}
               contentContainerStyle={{ paddingVertical: 5 }}
               showsHorizontalScrollIndicator={false}
            />

            {
               posts.map(post => (
                  <CPost post={post} navigation={navigation} />
               ))
            }
         </ScrollView>
      </View>

   )
}

export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
   },
   storyContainer: {
      alignItems: 'center',
      width: 80,
      marginHorizontal: 5,
      marginVertical: 5
   },
   storyImageContainer: {
      marginBottom: 5
   },

   postHeaderContainer: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
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
      flexDirection: 'row'
   }
})
