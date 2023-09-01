import React from 'react';
import {ApiList} from "@/components/ui/api-list";

const Api = () => {
    return (
        <div className="mt-10 space-y-10 w-3/4 mx-auto">
            <ApiList entityName="activity" entityIdName="activityId"/>
        </div>
    );
};

export default Api;
