import React from 'react';
import axios from 'axios';
import styled from "styled-components";
import { useRouter } from "next/router";
import {error} from "next/dist/build/output/log";

const DetailComp = styled.div`
    display:flex;
    flex-direction: column;
    width: 60%;
    margin: 1.6rem auto;
    height: auto;
    align-items: flex-start;
    justify-content: flex-start;
    
    h1 {
        margin: 0 0 1rem 0;
    }
    
    > div:nth-of-type(1){
        padding: 0 1rem;
        border-radius: 24px;
        transform: translateX(-30px);
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
    }
     > div:nth-of-type(2){
        height: 500px;
        width: 1400px;
        padding: 2rem 1.2rem;
        border-radius: 24px;
        transform: translateX(-17px);
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-flow: wrap row;
        margin: 1rem auto;
    }
    
    p {
        line-height: 30px;
    }
    
    button {
        position: fixed;
        padding: 1.2rem 1rem;
        right: 3%;
        bottom: 9%;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        border-radius: 50%;
        transition: .2s all;
        
        &:hover {
            transform: translateY(-8px)
        }
    }
`

const Place = styled.div`
    width: 450px;
    height: auto;
    padding: 1rem;
    margin: 1.2rem .5rem;
    border-radius: 24px;
    background: #fff;
    box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
    color: ${props => props.theme.colors.secondary};
    text-align: center;
    cursor: pointer;
    transition: .3s ease-in-out;
    position: relative;
        &:hover {
            transform: scale(1.05);
            
            
        }
    
    img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
    }

   `


const DetailId = ({ data }) => {
    const router = useRouter();

    function onClick() {
        router.back()
    }


    return (
        <section>
            <DetailComp>
                <h1>This : {data.place_name}</h1>
                <div style={{display:'flex'}}>
                    {
                        data.web_picture_urls.map((img,index) => {
                            return <Place key={index}>
                                <img src={img} alt=""/>
                            </Place>
                        })
                    }
                </div>
                <div>
                    <p>{data.place_information.detail}</p>
                </div>
                <button onClick={onClick} type={"button"}>Back</button>
            </DetailComp>
        </section>
    );
}

export const getServerSideProps = async ({res,query:{ dtId }}) => {
    let data;
    const response = await axios.get(`https://tatapi.tourismthailand.org/tatapi/v5/attraction/${dtId}`,{
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            'Accept-Language': 'th'
        }
    })

    if (response.status === 404) {
        res.end();
    }

    console.log(response.data.result)
    data = response.data.result;



    return {
        props: {
            data
        }
    }
}

export default DetailId;
