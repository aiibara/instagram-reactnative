import { StyleSheet, Text, View } from 'react-native'
import React, { FunctionComponent } from 'react'
import { screenHeight, screenWidth } from './shared';

interface ContainerProps {
    children: React.ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({children}) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: screenHeight,
        backgroundColor: 'pink'
    }
})