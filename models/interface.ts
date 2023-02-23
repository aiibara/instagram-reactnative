export interface IStory { 
    image: string, 
    name: string, 
    id: string 
};

export interface IPost { 
  id: string,
  user: IUser, 
  caption: string,
  userHasLiked: boolean, 
  location: string,
  createdAt: Date,
  type: 'image' | 'reels' | string,
  images: Array<string>
}

export interface IUser {
  userName: string,
  profilePic: string,
  id: string,
  fullName: string,
  hasStory: boolean
}


export interface IComment {
  user: IUser,
  text: string,
  likeCount?: number,
  userHasLiked?: boolean
}