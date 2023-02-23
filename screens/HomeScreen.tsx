import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IPost, IStory } from '../models/interface';
import CPost from '../components/CPost';
import { MainProps } from '../models/types';
import { APIAdapter } from '../components/shared';
import CProfilePic from '../components/CProfilePic';

type StoryProps = { item: IStory, index: number };

const StoryItem = ({ item, index }: StoryProps) => (
   <View style={styles.storyContainer}>
      <View style={styles.storyImageContainer}>
         <CProfilePic uri={item.image} diameter={70} hasStory={true} />
      </View>
      <Text style={{}} numberOfLines={1}>{item.name}</Text>
   </View>
);

const HomeScreen: FunctionComponent<MainProps<'Home'>> = ({ navigation }) => {


   const [stories, setStories] = useState<Array<IStory>>([
      { image: "https://picsum.photos/200/200", name: "widya limarto", id: "owner" },
      { image: "https://picsum.photos/300/300", name: "widya limarto", id: "fjdkafka" },
      { image: "https://picsum.photos/100/200", name: "widya limarto", id: "FDSAFA" },
      { image: "https://picsum.photos/200/500", name: "widya", id: "FAFAS" },
      { image: "https://picsum.photos/600/200", name: "widya", id: "FAFAS1" },
      { image: "https://picsum.photos/100/100", name: "widya", id: "FAFAS2" },
   ])

   const [posts, setPosts] = useState<Array<IPost>>([])
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const fetchPosts = async () => {
      setIsLoading(true)
      const result = await APIAdapter.get("/posts")
      console.log("result")
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
      setPosts(resultPosts)
      setIsLoading(false)
      return result
   }

   useEffect(() => {
      fetchPosts()
   }, [])


   return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
         <ScrollView
            contentContainerStyle={{ backgroundColor: '#fff' }}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
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