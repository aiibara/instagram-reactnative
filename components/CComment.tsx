import { View, Text, StyleSheet } from 'react-native'
import React, { FunctionComponent, useState } from 'react'
import { IComment } from '../models/interface'
import CProfilePic from './CProfilePic'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CParseText from './CParseText'
import Icon from 'react-native-vector-icons/Ionicons'
import { Color } from './shared'

type CCommentProps = {
   comment: IComment,
   canReply?: boolean
}

const CComment: FunctionComponent<CCommentProps> = ({ comment: _comment, canReply = true }) => {
   const [comment, setComments] = useState<IComment>(_comment);

   const toggleLikeComment = () => {
      setComments({
         ...comment,
         userHasLiked: !comment.userHasLiked
      })
   }

   return (
      <View style={styles.commentContainer}>
         <CProfilePic uri={comment.user.profilePic} diameter={30} hasStory={comment.user.hasStory} />
         <View style={styles.commentTextContainer}>
            <Text style={styles.commentUsername}>{comment.user.userName}</Text>
            <CParseText styles={styles.commentText}>{comment.text}</CParseText>

            {
               canReply && (
                  <View>
                     <TouchableOpacity>
                        <Text>Reply</Text>
                     </TouchableOpacity>
                  </View>
               )
            }
         </View>
         {
            canReply && (
               <View>
                  <TouchableOpacity style={styles.likeButton} onPress={toggleLikeComment}>
                     <Icon name={comment.userHasLiked ? 'heart' : 'heart-outline'} size={12} color={comment.userHasLiked ? Color.red : Color.black} />
                  </TouchableOpacity>
               </View>
            )
         }
      </View>
   )
}

export default CComment

const styles = StyleSheet.create({
   commentContainer: {
      flexDirection: 'row',
      flex: 1,
      paddingVertical: 10,
      paddingRight: 20,
      paddingLeft: 10
   },
   commentTextContainer: {
      marginLeft: 10,
      flex: 1
   },
   commentUsername: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '600'
   },
   commentText: {
      fontSize: 13,
      lineHeight: 18,
      flex: 1,
      marginRight: 30
   },
   likeButton: {
      marginTop: 2,
      padding: 10
   }
})