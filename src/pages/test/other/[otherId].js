import React from "react";
import {useRouter} from "next/router";

const Other = () => {
    const { otherId } = useRouter().query

    return (
        <div>
            <h1>This is Other Page.</h1>
            <p>page id : {otherId}</p>
        </div>
    );

}

export default Other;
