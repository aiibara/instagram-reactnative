import { useHeaderHeight } from '@react-navigation/elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CComment from '../components/CComment';
import Container from '../components/Container';
import CProfilePic from '../components/CProfilePic';
import CTextInput, { CTextInputRef } from '../components/CTextInput';
import { APIAdapter, Color, emoButtons } from '../components/shared';
import { IComment } from '../models/interface';
import { RootStackParamList } from '../models/types';

const CommentScreen = () => {
   const [inputHeight, setInputHeight] = useState<number>(0);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { params: { post } } = useRoute<RouteProp<RootStackParamList, 'Comments'>>()
   const headerHeight = useHeaderHeight();
   const inputRef = React.createRef<CTextInputRef>();
   const [comments, setComments] = useState<Array<IComment>>([])

   const appendText = (emo: string) => {
      inputRef.current?.appendText(emo)
   }

   const fetchComments = async () => {
      setIsLoading(true)
      const result = await APIAdapter.get("/comments/" + post.id);

      const data = result.record.data.map((comment: any) => ({
         user: {
            userName: comment.user.username,
            profilePic: comment.user.profile_picture,
            id: comment.user.id,
            fullName: comment.user.full_name,
            hasStory: comment.user.has_story
         },
         text: comment.text,
         likeCount: comment.likes,
         userHasLiked: comment.userHasLikes
      }))
      setComments(data)
      setIsLoading(false)
   }

   useEffect(() => {
      fetchComments()
   }, [])

   const submitComment = () => {
      setComments([
         ...comments,
         {
            user: post.user,
            text: inputRef.current?.getInputData(),
            likeCount: 0,
            userHasLiked: false
         }
      ])
      inputRef.current?.clearInput()
   }

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         keyboardVerticalOffset={headerHeight}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Container>
               <Container>
                  <ScrollView>
                     <CComment comment={{ user: post.user, text: post.caption }} canReply={false} />
                     {
                        isLoading && (
                           <ActivityIndicator />
                        )
                     }
                     
                     {
                        comments.map(comment => (
                           <CComment comment={comment} />
                        ))
                     }
                  </ScrollView>
               </Container>
               <View style={styles.emoInputContainer}>
                  {
                     emoButtons.map(emo => (
                        <TouchableOpacity key={emo} onPress={() => appendText(emo)}>
                           <Text>{emo}</Text>
                        </TouchableOpacity>
                     ))
                  }
               </View>
               <View style={styles.commentInputContainer}>
                  <CProfilePic uri={post?.images[0]} diameter={43} hasStory={post.user.hasStory} />
                  <View style={styles.commentTextInputContainer} onLayout={(event) => setInputHeight(event.nativeEvent.layout.height)}>

                     <CTextInput
                        ref={inputRef}
                        placeholder='Add a comment'
                        style={styles.commentTextInput}
                        multiline={true}
                        scrollEnabled={inputHeight > 180 ? true : false}
                     />
                     <TouchableOpacity
                        onPress={() => { submitComment() }}
                        style={styles.commentButton}
                     >
                        <Text style={styles.commentButtonText}>Post</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Container>
         </SafeAreaView>

      </KeyboardAvoidingView>

   )
}

export default CommentScreen

const styles = StyleSheet.create({
   emoInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: Color.lightGray,
      paddingVertical: 10,
      paddingHorizontal: 20,

   },
   commentInputContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'flex-end'
   },

   commentTextInputContainer: {
      padding: 10,
      borderColor: Color.lightGray,
      borderWidth: 1,
      flex: 1,
      marginLeft: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      maxHeight: 200,
      height: '100%'
   },
   commentTextInput: {
      flex: 1,
      marginRight: 10
   },
   commentButton: {
      flex: 1,
      justifyContent: 'flex-end'
   },
   commentButtonText: {
      color: Color.lightBlue,
      fontWeight: '600',
      lineHeight: 20
   }
})