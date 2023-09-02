import React from 'react';
import {ApiList} from "@/components/ui/api-list";
import Title from "@/components/Title";
import {Separator} from "@/components/ui/separator";

const Api = () => {
    return (
        <div className="mt-10 space-y-5 w-3/4 mx-auto">
            <Title title="Api Document" description="Api CRUD operations document" />
            <Separator/>
            <ApiList entityName="activity" entityIdName="activityId"/>
        </div>
    );
};

export default Api;
