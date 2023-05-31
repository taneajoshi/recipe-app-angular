import { Injectable } from '@angular/core';
import { StorageKeys } from './storage-keys.enum';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Driver being used
   */
  public driver(): Storage {
    return window.localStorage;
  }

  /**
   * Returns the value stored in key
   * @param key
   */
  public get < T = any > (key: StorageKeys): Observable < T | null > {
    return of(this.driver().getItem(key)).pipe(
      map((result) => (result === null ? null : JSON.parse(result))),
    );
  }

  /**
   * Stores a values against a key else updates if existing key found
   * @param key
   * @param value
   */
  public set < T = any > (key: StorageKeys, value: T): Observable < boolean > {
    this.driver().setItem(key, JSON.stringify(value));
    console.log(key, value);
    return of(true);
  }

  /**
   * Removes the key stored
   * @param key
   */
  public remove(key: StorageKeys): Observable < boolean > {
    this.driver().removeItem(key);
    return of(true);
  }

  /**
   * Removes all keys
   */
  public clearAll(): Observable < boolean > {
    this.driver().clear();
    return of(true);
  }
}
