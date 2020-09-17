import React from 'react';
import axios, { get } from 'axios';
import { useRouter } from "next/router";

import {DetailComp, Place, NotData} from '../../../../public/styles/detail.styles'

const Restaurant = ({ result }) => {
    const router = useRouter();

    console.log(result)

    function onClick() {
        router.back()
    }

    return (
        <section>
            {
                router.isFallback ? (
                    <NotData>
                        <h1>Loading....</h1>
                        <button onClick={onClick} type={"button"}>Back</button>
                    </NotData>
                ) : (
                    <DetailComp>
                        <h1>This : {result.place_name}</h1>
                        <div style={{display:'flex'}}>
                            {
                                result.web_picture_urls ?
                                result.web_picture_urls.map((img,index) => {
                                    return <Place key={index}>
                                        <img src={img} alt=""/>
                                    </Place>
                                }) : null
                            }
                        </div>
                        <div>
                            <p>{result.place_information.detail}</p>
                        </div>
                        <button onClick={onClick} type={"button"}>Back</button>
                    </DetailComp>
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
    console.log(resId)

    const res = await get(`https://tatapi.tourismthailand.org/tatapi/v5/restaurant/${resId}`,{
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


export default Restaurant;


