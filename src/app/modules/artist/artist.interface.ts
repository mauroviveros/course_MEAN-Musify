export interface Artist{
  _id         : string,
  description : string,
  image?      : string
  name        : string,
}


export interface ArtistRequest{
  description?  : string,
  image?        : string
  name?         : string,
}

export interface ArtistList{
  docs: Artist[],
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


export interface ArtistPagination{
  page  : number,
  limit : number
}
