import React, { FunctionComponent, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native';
import { Color } from './shared';

type CProfilePicProps = {
   uri: string,
   diameter: number,
   hasStory: boolean
}

const CProfilePic: FunctionComponent<CProfilePicProps> = ({ uri, diameter, hasStory }) => {

   const [profilePicError, setProfilePicError] = useState<Boolean>(false);
   return (
      <View style={[styles.storyImageContainer,
      {
         width: diameter,
         height: diameter,
         borderRadius: diameter / 2,
         borderWidth: diameter > 50 ? 2 : 1.2,
         borderColor: hasStory ? Color.red : 'white'
      }]}>
         <Image
            source={{ uri: !profilePicError ? uri : "https://picsum.photos/100/100" }}
            style={{
               width: '100%',
               height: '100%',
               borderRadius: diameter / 2
            }}
            onError={() => setProfilePicError(true)} />
      </View>

   )
}

export default CProfilePic;

const styles = StyleSheet.create({
   storyImageContainer: {
      borderWidth: 2,
      padding: 2
   }
})