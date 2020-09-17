import React from "react";
import {useRouter} from "next/router";

const Shop = () => {
    const { shopId } = useRouter().query

    return (
        <div>
            <h1>This is Shop Page.</h1>
            <p>page id : {shopId}</p>
        </div>
    );

}

export default Shop;
