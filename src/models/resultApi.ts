import { Character } from "./character.model";

export interface ResultApi {
    current: number;
    pages?: number;
    next: string;
    prev: string;
    results: Character[];
}