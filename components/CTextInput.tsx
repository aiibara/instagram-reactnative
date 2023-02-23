import React, { useImperativeHandle, useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';


export interface CTextInputRef {
   getInputData(): any;
   appendText(emo: string): void;
   clearInput(): void;
}

const CTextInput = React.forwardRef(
   (
      props: TextInputProps,
      ref: React.Ref<CTextInputRef>,
   ) => {
      const [commentText, setCommentText] = useState<string>("");
      const [selectionPosition, setSelectionPosition] = useState<{ start: number, end: number }>({ start: 0, end: 0 });

      const inputRef = React.createRef<TextInput>();

      useImperativeHandle(ref, () => ({
         getInputData() {
            return commentText
         },
         appendText(emo: string) {
            console.log("commenttext", commentText)
            inputRef.current?.focus()
            inputRef.current?.setNativeProps({ text: commentText.slice(0, selectionPosition.start) + emo + commentText.slice(selectionPosition.end) })
         },
         clearInput() {
            inputRef.current?.setNativeProps({ text: "" })
         }
      }))

      return (
         <TextInput
            ref={inputRef}
            onChangeText={(text: string) => setCommentText(text)}
            onSelectionChange={(event) => setSelectionPosition(event.nativeEvent.selection)}
            {...props}
         />
      )
   })


export default CTextInput
