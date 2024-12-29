import {MockDataState, SearchState} from '../features/search/store';

export interface AppState {
  search: SearchState;
  mockData: MockDataState;
}
