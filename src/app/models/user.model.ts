export class User {
  constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate ) {}

  get token() {
    //return null if token expiraton date dont exists or token date is smaller than the current date.
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token
  }
}
