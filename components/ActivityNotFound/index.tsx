import React from 'react';

interface Props {
    description: string
}

const ActivityNotFound: React.FC<Props> = ({description}) => {
    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <div className="flex items-center justify-center">
                <p className="text-md font-bold border-b border-b-secondary-foreground dark:border-b-destructive-foreground ">{description}</p>
            </div>
        </div>
    )
        ;
};

export default ActivityNotFound;
