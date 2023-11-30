import { Tag } from "src/app/components/tags/tags.model";
import { Issue } from "../components/issues/issues.model";

export interface AppState {
    tags: Tag[];
    selectedIndex: number | null;
}