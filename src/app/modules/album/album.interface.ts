export interface Album{
  _id         : string,
  description : string,
  name        : string,
  year        : number,
  artist      : string,
  artistName? : string,
  image?      : string
}


export interface AlbumRequest{
  description : string,
  name        : string,
  year        : number,
  artist      : string,
  image?      : string,
}

export interface AlbumList{
  docs: Album[],
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


export interface AlbumPagination{
  page  : number,
  limit : number
}
