import {DataState} from "../_enum/data.state.enum";


export interface AppState<T> {
  dataState: DataState;
  appData?: T; //données génériques (all servers, one server, create, delete, ping...)
  error?: string; // ? du fait qu'on puisse avoir soit des données soit une erreur
}
