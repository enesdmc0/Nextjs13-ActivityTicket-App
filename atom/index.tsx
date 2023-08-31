import {atom} from "jotai";
import {DateRange} from "react-day-picker";


export const dateAtom = atom<DateRange | undefined>(undefined)