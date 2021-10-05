import { GroupSearchState } from "./group-search/group-search.reducer";
import { TextSearchState } from "./text-search/text-search.reducer";
import { ThemeSearchState } from "./theme-search/theme-search.reducer";

export interface AppState {
  readonly groupSearch: GroupSearchState;
  readonly themeSearch: ThemeSearchState;
  readonly textSearch: TextSearchState;
}
