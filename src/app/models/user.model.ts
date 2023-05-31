export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate ) {}

  get token() {
    //return null if 
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token
  }
}
