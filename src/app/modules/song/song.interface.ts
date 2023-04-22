import { Album } from "../album/album.interface"

export interface Song{
  _id       : string,
  name      : string,
  number    : number,
  duration  : number,
  album     : string,
  file?     : string,
  artistName: string,
  albumName : string
}


export interface SongRequest{
  name      : string,
  number    : number,
  duration  : number,
  album     : string,
  file?     : string
}

export interface SongResponse{
  _id       : string,
  name      : string,
  number    : number,
  duration  : number,
  album     : Album,
  file?     : string
}

export interface SongList{
  docs: Song[],
  hasNextPage   : boolean,
  hasPrevPage   : boolean,
  limit         : number,
  nextPage      : number | null,
  page          : number,
  pagingCounter : number,
  prevPage      : number | null,
  totalDocs     : number,
  totalPages    : number
}


export interface SongPagination{
  page  : number,
  limit : number
}
