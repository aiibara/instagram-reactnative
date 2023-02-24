import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { IPost, IUser } from "./interface";


export type RootStackParamList = {
    Main: NavigatorScreenParams<BottomTabParamList | RootStackParamList>;
    Notifications: undefined;
    Messages: undefined;
    Comments: { post: IPost };
}

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Profile: {user: IUser};
}

export type RootStackProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>


export type MainProps<T extends keyof BottomTabParamList> = 
CompositeScreenProps<
BottomTabScreenProps<BottomTabParamList, T>,
    RootStackProps<keyof RootStackParamList>
>;