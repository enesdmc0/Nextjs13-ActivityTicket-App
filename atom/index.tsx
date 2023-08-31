import {atom} from "jotai";
import {DateRange} from "react-day-picker";
import {Activity} from "@prisma/client";


export const dateAtom = atom<DateRange | undefined>(undefined)

export const searchAtom = atom<string>("");
export const datasAtom = atom<Activity[]>([])

export const filteredDatasAtom = atom( (get) => {
    const datas = get(datasAtom);
    const search = get(searchAtom);
    if (!search) return datas;
    return datas.filter(data => data.organizers.toLowerCase().includes(search.toLowerCase()) || data.title.toLowerCase().includes(search.toLowerCase()))
})

