import React from 'react';
import { get } from 'axios';
import { useRouter } from "next/router";
import {NotData_component} from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";


const Restaurant = ({ result }) => {
    const router = useRouter();

    console.log(result)

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
            {params:{resId: "P08000799"}}
        ],
        fallback: true
    }
}

export const getStaticProps = async ({ params: { resId } }) => {
    let result;

    try {
        const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/restaurant/${resId}`,{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
                'Accept-Language': 'th'
            }
        })

        if (!res) throw new Error('Cannot fetch data.')

        result = res.data.result
    } catch (err) {
        console.log(err)
    }

    return {
        props: {
            result
        }
    }
}


export default Restaurant;


