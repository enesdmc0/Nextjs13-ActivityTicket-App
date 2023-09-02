"use client"
import React from 'react';
import Card from "@/components/Card"
import {useAtomValue} from "jotai";
import {filteredDatasAtom} from "@/atom";
import ActivityNotFound from "@/components/ActivityNotFound";


const ActivityList = () => {
    const datas = useAtomValue(filteredDatasAtom)
    return (
        <div className="grid grid-cols-6 gap-5">
            {datas.length === 0
                ? (<div className="col-span-3"><ActivityNotFound description="No activity found according to your search criteria."/></div>)
                : ( datas.map(activity => (
                       <Card key={activity.id} activity={activity}/>
                   )))
            }

        </div>
    );
};

export default ActivityList;
