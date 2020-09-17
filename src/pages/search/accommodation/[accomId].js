import React, {useEffect, useContext, useState} from 'react';
import axios, { get } from 'axios';
import { useRouter } from "next/router";
import { NotData_component } from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";
import { GlobalContext } from "../../../Context/Context";


const ACCOMMODATION = () => {
    const { accomId } = useRouter().query;
    const { apiDetail } = useContext(GlobalContext)
    const [result, setResult] = useState(null)

    useEffect(() => {
        let active = true
        if (active) {
            const fetch = async () => {
                const res = await apiDetail(accomId,'accommodation')
                setResult(res)
                console.log(res)
            }

            fetch()
        }

        return () => {
            active = false
        }
    },[accomId])


    return (
        <section>
            {
                !result ? (
                    <NotData_component />
                ) : (
                    <Detail_Component result={result} />
                )
            }
        </section>

    );
}

/*export const getStaticPaths = async () => {

    return {
        paths:[
            {params:{accomId: "P02000087"}}
        ],
        fallback: true
    }
}*/

/*export const getStaticProps = async ({ params: { accomId } }) => {
    let result;

    try {
        const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/accommodation/${accomId}`,{
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
}*/


export default ACCOMMODATION;

