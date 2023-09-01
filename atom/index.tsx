import {atom} from "jotai";
import {DateRange} from "react-day-picker";
import {Activity} from "@prisma/client";

const today = new Date()
const tomorrow = new Date(today);

tomorrow.setDate(today.getDate() + 1)


const dateRange = {
    from: today,
    to: tomorrow,
};
export const dateAtom = atom<DateRange>(dateRange)

export const searchAtom = atom<string>("");
export const datasAtom = atom<Activity[]>([])

export const filteredDatasAtom = atom( (get) => {
    const datas = get(datasAtom);
    const search = get(searchAtom);
    if (!search) return datas;
    return datas.filter(data => data.organizers.toLowerCase().includes(search.toLowerCase()) || data.title.toLowerCase().includes(search.toLowerCase()))
})

