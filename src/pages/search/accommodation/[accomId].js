import React from 'react';
import { get } from 'axios';
import { useRouter } from "next/router";
import { NotData_component } from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";



const ACCOMMODATION = ({ result }) => {
    const router = useRouter();


    return (
        <section>
            {
                router.isFallback ? (
                    <NotData_component />
                ) : (
                    <Detail_Component result={result} />
                )
            }
        </section>

    );
}

export const getStaticPaths = async () => {

    return {
        paths:[
            {params:{accomId: "P02000087"}}
        ],
        fallback: true
    }
}

export const getStaticProps = async ({ params: { accomId } }) => {
    console.log(accomId)

    const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/accommodation/${accomId}`,{
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

    const result = await res;


    return {
        props: {
            result
        }
    }
}


export default ACCOMMODATION;

