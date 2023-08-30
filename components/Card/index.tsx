import React from 'react';
import { cn } from "@/lib/utils";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "@prisma/client";
import { Badge, badgeVariants } from "@/components/ui/badge";

interface Props {
    className?: React.ComponentProps<typeof Card>
    activity: Activity
}


const CardComponent: React.FC<Props> = ({ className, activity, ...props }) => {

    return (
        <Card className={cn("col-span-1 relative cursor-pointer", className)} {...props}>
            <div className="relative z-50 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <span className="ml-auto space-x-1">
                            {activity.isFree && <Badge variant="destructive">Free</Badge>}
                            {activity.isPopuler && <Badge>Populer</Badge>}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-white text-xl font-semibold">
                        {activity.title}
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-md font-bold">
                    {activity.description}
                </CardContent>
                <CardFooter>
                    <div className="ml-auto space-x-3 space-y-2">
                        <Badge>{activity.city}</Badge>
                        <Link href="/122333" className={badgeVariants({ variant: "default" })}>{activity.category}</Link>
                        {activity.price && <Badge>{activity.price} TL</Badge>}
                        <Badge variant="secondary">{activity.startDate.toISOString().split("T")[0]} - {activity.endDate.toISOString().split("T")[0]}</Badge>
                    </div>
                </CardFooter>
            </div>

            <Image fill
                src="https://plus.unsplash.com/premium_photo-1669997804173-1cf7003d0664?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="Image" className="rounded-md object-cover" />
                
        </Card>
    );
};

export default CardComponent;
