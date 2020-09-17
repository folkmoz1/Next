import React from "react";
import { useRouter } from "next/router";
import  { NotData } from "../../public/styles/detail.styles";


export const NotData_component = () => {
    const router = useRouter()

    function onClick() {
        router.back()
    }

    return (
        <NotData>
            <h1>Loading....</h1>
            <button onClick={onClick} type={"button"}>Back</button>
        </NotData>
    );
}

