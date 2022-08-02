export type Picture = {
  id: number;
  author: string;
  width: number;
  height: number;
  download_url: string;
};

export type LikedPictures = {
  likedPhotos: Picture[];
  setLikedPhotos: React.Dispatch<React.SetStateAction<Picture[]>>;
};
