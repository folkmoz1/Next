import React from 'react';
import axios, { get } from 'axios';
import { useRouter } from "next/router";

import {NotData_component} from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";

const LocateId = ({ result }) => {
    const router = useRouter();

    return (
        <section>
            {
                router.isFallback ? (
                    <NotData_component />
                ) : (
                    <Detail_Component  result={result}/>
                )
            }
        </section>

    );
}

export const getStaticPaths = async () => {

    return {
        paths:[
            {params:{locateId:'P03003461'}}
            ],
        fallback: true
    }
}

export const getStaticProps = async ({ params: {locateId} }) => {
    console.log(locateId)

    const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/attraction/${locateId}`,{
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
            'Accept-Language': 'th'
        }
    }).then(res => {
        return res.data.result
    }).catch(err => {
        console.log(err)
    })

    const result =  res;


    return {
        props: {
            result
        }
    }
}


export default LocateId;
