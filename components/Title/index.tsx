import React from 'react';

interface Props {
    title: string;
    description?: string
}

const Title: React.FC<Props> = ({title, description}) => {
    return (
        <>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-xs font-semibold">{description}</p>
        </>
    );
};

export default Title;
