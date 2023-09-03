"use client"
import React, {useEffect} from 'react';
import {Input} from "@/components/ui/input";
import {Activity} from "@prisma/client";
import {useSetAtom, useAtom} from "jotai";
import {datasAtom, searchAtom} from "@/atom";
import {Button} from "@/components/ui/button";
import {Image as Images} from ".prisma/client";

interface Props {
    activities: (Activity & {images: Images[]})[]
}

const Search: React.FC<Props> = ({activities}) => {
    const [search, setSearch] = useAtom(searchAtom)

    const setDatas = useSetAtom(datasAtom)

    useEffect(() => {
        setDatas(activities)
    }, [activities, setDatas])

    return (
        <div className="flex gap-5">
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search activity..." />
            <Button onClick={() => setSearch("")} variant="secondary" type="button">Reset</Button>
        </div>
    );
};

export default Search;
