import React, {useContext, useEffect, useState} from 'react';
import { get } from 'axios';
import { useRouter } from "next/router";
import {NotData_component} from "../../../components/NotData_component";
import {Detail_Component} from "../../../components/Deatail_Component";
import {GlobalContext} from "../../../Context/Context";


const Restaurant = () => {
    const { resId } = useRouter().query;
    const { apiDetail } = useContext(GlobalContext)
    const [result, setResult] = useState(null)

    useEffect(() => {
        let active = true
        if (active) {
            const fetch = async () => {
                const res = await apiDetail(resId,'restaurant')
                setResult(res)
                console.log(res)
            }

            fetch()
        }

        return () => {
            active = false
        }
    },[resId])


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




export default Restaurant;


