import React from 'react';
import {Armchair} from "lucide-react";
import {Activity} from "@prisma/client";
import {Badge} from "@/components/ui/badge";

const data = [
    {
        id: "A", price: 100, chairs: [
            {id: 1, isNull: true},
            {id: 2, isNull: false},
            {id: 3, isNull: true},
            {id: 4, isNull: true},
            {id: 5, isNull: false},
            {id: 6, isNull: true},
            {id: 7, isNull: false},
            {id: 8, isNull: true},
            {id: 9, isNull: true},
            {id: 10, isNull: true},
        ]
    },
    {
        id: "B", price: 200, chairs: [
            {id: 1, isNull: true},
            {id: 2, isNull: false},
            {id: 3, isNull: true},
            {id: 4, isNull: true},
            {id: 5, isNull: false},
            {id: 6, isNull: true},
            {id: 7, isNull: false},
            {id: 8, isNull: true},
            {id: 9, isNull: true},
            {id: 10, isNull: true},
        ]
    },
    {
        id: "C", price: 300, chairs: [
            {id: 1, isNull: true},
            {id: 2, isNull: false},
            {id: 3, isNull: true},
            {id: 4, isNull: true},
            {id: 5, isNull: false},
            {id: 6, isNull: true},
            {id: 7, isNull: false},
            {id: 8, isNull: true},
            {id: 9, isNull: true},
            {id: 10, isNull: true},
        ]
    },
    {
        id: "D", price: 400, chairs: [
            {id: 1, isNull: true},
            {id: 2, isNull: false},
            {id: 3, isNull: true},
            {id: 4, isNull: true},
            {id: 5, isNull: false},
            {id: 6, isNull: true},
            {id: 7, isNull: false},
            {id: 8, isNull: true},
            {id: 9, isNull: true},
            {id: 10, isNull: true},
        ]
    },
    {
        id: "E", price: 500, chairs: [
            {id: 1, isNull: true},
            {id: 2, isNull: false},
            {id: 3, isNull: true},
            {id: 4, isNull: true},
            {id: 5, isNull: false},
            {id: 6, isNull: true},
            {id: 7, isNull: false},
            {id: 8, isNull: true},
            {id: 9, isNull: true},
            {id: 10, isNull: true},
        ]
    },
]

interface Props {
    activity: Activity
}

const ChairLayout: React.FC<Props> = ({activity}) => {

    const prices = [100, 200, 300, 400, 500]

    return (
        <div className="space-y-5 ">
            <div className="grid grid-cols-10 border-4 rounded-md p-1 md:p-5 gap-y-10">
                <div className="col-span-10 space-y-10">
                    {data.map(item => (
                        <div key={item.id} className="grid  grid-cols-10 gap-y-10">
                            {item.chairs.map(chair => (
                                <div key={chair.id} className="relative flex flex-col items-center justify-center">
                                    <Armchair
                                        className={`w-6 h-6 md:w-8 md:h-8 ${!chair.isNull && "text-gray-500 hover:cursor-not-allowed"} `}/>
                                    <div className={`text-xs md:text-xs font-semibold`}>{item.id}{chair.id}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
                {activity.price !== 0
                    ? prices.map((price, index) => (
                        <div key={index} className="flex items-center space-x-1">
                            <div
                                className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">A
                            </div>
                            <div className="font-bold text-xs">{price} TL</div>
                        </div>))
                    : (<div className="flex items-center">
                        <Badge>Free</Badge>
                    </div>)
                }

                <div className="flex flex-col xl:flex-row items-center space-x-0 xl:space-x-1">
                    <Armchair className={`w-5 h-5 xl:w-8 xl:h-8 `}/>
                    <div className="font-bold text-xs xl:text-xs">Empty</div>
                </div>
                <div className="flex flex-col xl:flex-row items-center space-x-0 xl:space-x-1">
                    <Armchair className={`xl:w-8 xl:h-8 w-5 h-5 text-gray-500`}/>
                    <div className="font-bold text-xs xl:text-xs">Full</div>
                </div>
            </div>
            <div className="border-4 h-16 flex items-center justify-center rounded-md">Scene</div>

        </div>
    );
};

export default ChairLayout;
