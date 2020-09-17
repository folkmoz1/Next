import React from "react";
import { useRouter } from "next/router";
import  { NotData } from "../../public/styles/detail.styles";
import { CircularProgress } from "@material-ui/core";


export const NotData_component = () => {
    const router = useRouter()

    function onClick() {
        router.back()
    }

    return (
        <NotData>
            <CircularProgress  color={"secondary"} variant={"determinate"}/>
            <button onClick={onClick} type={"button"}>Back</button>
        </NotData>
    );
}

