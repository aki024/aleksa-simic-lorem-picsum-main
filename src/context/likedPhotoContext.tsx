import { createContext } from "react";
import { LikedPictures } from "../models/Picture.model";

export const LikedPhotosContext = createContext<LikedPictures>({
  likedPhotos: [],
  setLikedPhotos: () => {},
});
