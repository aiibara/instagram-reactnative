import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import ParsedText from 'react-native-parsed-text';
import { StyleProp, TextStyle } from 'react-native/types';
import { BottomTabParamList } from '../models/types';
import { Color } from './shared';

type CParseTextProps = {
   children: React.ReactNode | string,
   styles?: TextStyle
}

const CParseText: FunctionComponent<CParseTextProps> = ({ children, styles = {} }) => {
   const { navigate } = useNavigation<NavigationProp<BottomTabParamList>>()
   return (
      <ParsedText
         style={{ fontWeight: '400', ...styles }}
         parse={
            [
               { pattern: /\@([A-z]*)/i, style: { color: Color.blue }, onPress: () => navigate('Search') },
               { pattern: /#(\w+)/, style: { color: Color.blue }, onPress: () => navigate('Search') },
            ]
         }
      >{children}</ParsedText>
   )
}

export default CParseText