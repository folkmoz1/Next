import React, {useContext, useEffect, useState} from "react";
import { get } from 'axios'
import {useRouter} from "next/router";
import {NotData_component} from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";
import {GlobalContext} from "../../../Context/Context";

const Other = () => {
    const { otherId } = useRouter().query;
    const { apiDetail } = useContext(GlobalContext)
    const [result, setResult] = useState(null)

    useEffect(() => {
        let active = true
        if (active) {
            const fetch = async () => {
                const res = await apiDetail(otherId,'other')
                setResult(res)
                console.log(res)
            }

            fetch()
        }

        return () => {
            active = false
        }
    },[otherId])


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


/*
export const getStaticPaths = async () => {

    return {
        paths:[
            {params:{otherId: "P03006862"}}
        ],
        fallback: true
    }
}

export const getStaticProps = async ({ params: { otherId } }) => {
    let result;

    try {
        const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/other/${otherId}`,{
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
*/


export default Other;
