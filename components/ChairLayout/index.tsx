import React from 'react';
import {Armchair} from "lucide-react";

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

const ChairLayout = () => {

    return (
        <div className="space-y-5 ">
            <div className="grid grid-cols-11 border-4 rounded-md p-5 gap-y-10">
                <div className="col-span-10 space-y-10">
                    {data.map(item => (
                        <div key={item.id} className="grid  grid-cols-10 gap-y-10">
                            {item.chairs.map(chair => (
                                <div key={chair.id} className="relative flex flex-col items-center justify-center">
                                    <Armchair
                                        className={`w-8 h-8 ${!chair.isNull && "text-gray-500 hover:cursor-not-allowed"} `}/>
                                    <div className={`text-xs font-semibold`}>{item.id}{chair.id}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="col-span-1 border-l space-y-5 p-2">
                    <div className="flex items-center space-x-1">
                        <div
                            className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">A
                        </div>
                        <div className="font-bold text-xs">100 TL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div
                            className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">B
                        </div>
                        <div className="font-bold text-xs">200 TL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div
                            className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">C
                        </div>
                        <div className="font-bold text-xs">300 TL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div
                            className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">D
                        </div>
                        <div className="font-bold text-xs">400 TL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div
                            className="font-bold text-xs border rounded-full flex items-center justify-center p-2 h-5 w-5">E
                        </div>
                        <div className="font-bold text-xs">500 TL</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Armchair className={`w-8 h-8 `}/>
                        <div className="font-bold text-xs">Empty</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Armchair className={`w-8 h-8 text-gray-500`}/>
                        <div className="font-bold text-xs">Full</div>
                    </div>
                </div>
            </div>
            <div className="border-4 h-16 flex items-center justify-center rounded-md">Sahne</div>

        </div>
    );
};

export default ChairLayout;
