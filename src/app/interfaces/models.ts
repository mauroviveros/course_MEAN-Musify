export class User{
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public image: string
  ){};
};

export class Artist{
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public image: string
  ){};
};

export class Album{
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public year: string,
    public image: string,
    public artist: string
  ){};
};


export class Song{
  constructor(
    public _id: string,
    public name: string,
    public number: number,
    public file: string,
    public album: string
  ){};
};
