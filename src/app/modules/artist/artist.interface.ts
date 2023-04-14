export interface Artist{
  _id: string,
  name: string,
  description: string,
  image?: string
}


export interface ArtistRequest{
  name?: string,
  description?: string,
  image?: string
}
