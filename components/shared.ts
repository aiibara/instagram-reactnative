
import { BASE_URL } from "@env";
import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export const Color = {
    red: '#F30A49',
    black: '#090030',
    lightBlue: '#3A98B9',
    blue: '#0C3C78',
    lightGray: '#EEEEEE',
    gray: '#DDDDDD'
}

export const emoButtons = ["❤️", "🙌", "🔥", "👏", "🥲", "😍", "😮", "😂"]

const baseUrl = BASE_URL;
export const APIAdapter = {
    get: async (endpoint: string) => {
        const data = await fetch(baseUrl+endpoint, {method: "GET"})
        const result = await data.json()
        return result
    },
    post: async () => {

    }
}