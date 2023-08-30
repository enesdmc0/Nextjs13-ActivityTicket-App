import {atom} from "jotai";
import {DateRange} from "react-day-picker";
import {addDays} from "date-fns";

export const categoryAtom = atom<string>("")
export const cityAtom = atom<string>("")
export const placeAtom = atom<string>("")
export const dateAtom = atom<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
})