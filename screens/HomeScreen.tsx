import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { IPost, IStory } from '../models/interface';
import { MainProps } from './Main';
import CPost from '../components/CPost';

type StoryProps = { item: IStory, index: number };

const StoryItem = ({ item, index }: StoryProps) => (
   <View style={styles.storyContainer}>
      <View style={styles.storyImageContainer}>
         <Image source={{ uri: item.image }} style={styles.storyImage} />
      </View>
      <Text style={{}} numberOfLines={1}>{item.name}</Text>
   </View>
);

const HomeScreen: FunctionComponent<MainProps> = ({ navigation }) => {


   const [stories, setStories] = useState<Array<IStory>>([
      { image: "https://picsum.photos/200/200", name: "widya limarto", id: "owner" },
      { image: "https://picsum.photos/200/200", name: "widya limarto", id: "fjdkafka" },
      { image: "https://picsum.photos/200/200", name: "widya limarto", id: "FDSAFA" },
      { image: "https://picsum.photos/200/200", name: "widya", id: "FAFAS" },
      { image: "https://picsum.photos/200/200", name: "widya", id: "FAFAS1" },
      { image: "https://picsum.photos/200/200", name: "widya", id: "FAFAS2" },
   ])

   const [posts, setPosts] = useState<Array<IPost>>([])

   const fetchPosts = async () => {
      const data = await fetch("https://private-eb4bfe-aiibara.apiary-mock.com/posts", { method: "GET" })
      const result = await data.json()
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
      return result
   }

   useEffect(() => {
      fetchPosts()
   }, [])


   return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
         <ScrollView
            contentContainerStyle={{ backgroundColor: '#fff' }}
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
      width: 70,
      height: 70,
      borderRadius: 40,
      borderColor: 'red',
      borderWidth: 2,
      padding: 2,
      marginBottom: 5
   },
   storyImage: {
      width: '100%',
      height: '100%',
      borderRadius: 30
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
      flexDirection: 'row',

   }
})