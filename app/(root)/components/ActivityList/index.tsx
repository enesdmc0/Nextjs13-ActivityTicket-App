"use client"
import React from 'react';
import Card from "@/components/Card"
import {useAtomValue} from "jotai";
import {filteredDatasAtom} from "@/atom";


const ActivityList = () => {
    const datas = useAtomValue(filteredDatasAtom)
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                datas.map(activity => (
                    <Card key={activity.id} activity={activity}/>
                ))
            }

        </div>
    );
};

export default ActivityList;
