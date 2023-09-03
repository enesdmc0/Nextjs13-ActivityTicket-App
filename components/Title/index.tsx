import React from 'react';

interface Props {
    title: string;
    description?: string
}

const Title: React.FC<Props> = ({title, description}) => {
    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-bold capitalize">{title}</h2>
            <p className="text-xs font-semibold">{description}</p>
        </div>
    );
};

export default Title;
