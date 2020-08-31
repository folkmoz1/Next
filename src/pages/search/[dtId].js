import React,{ useContext, useState, useEffect} from 'react';
import { GlobalContext } from "../../Context/Context";
import { useRouter } from "next/router";
import styled from "styled-components";

const DetailComp = styled.div`
    display:flex;
    flex-direction: column;
    width: 96%;
    margin: 1.6rem auto;
    height: auto;
    align-items: center;
    justify-content: center;
        
        @media (max-width: 1400px) {
            margin: 0;
            width: 100%;
        }
    
        @media (max-width: 568px) {
            overflow: hidden;
            align-items: flex-start;
        }
    
    h1 {
        margin: 0 0 1rem 0;
        
        @media (max-width: 568px) {
            text-align: center;
            width: 100%;
            font-size: 1.7rem;
            margin: 2.7rem 0 1.3rem;
            letter-spacing: 2px;
        }
    }
    > div:nth-of-type(1) {
        width: 100%;
        
    }
    
    > div:nth-of-type(2){
        padding: 0 1rem;
        border-radius: 24px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-wrap: nowrap;
        
            @media (max-width: 568px) {
               border-radius: 8px;
               padding: 0 0 0 .5rem;
               width: 100%;
               
               > div:nth-of-type(3) {
                    display: none;
               }
            }
    }
     > div:nth-of-type(3){
        padding: 1.4rem 1.9rem;
        width: 100%;
        height: 400px;
        border-radius: 24px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-flow: wrap row;
        margin: 1rem 0;
        
            @media (max-width: 1400px) {
                width: 85%;
            }
        
            @media (max-width: 568px) {
                width: 95%;
                transform: translateX(0);
                margin: 1rem auto;
                padding: 1.2rem 2rem;
                height: auto;
                text-align: justify;
                letter-spacing: .8px;
                
                button {
                    cursor: default;
                }
            }
        
             
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
    cursor: pointer;
    transition: .3s ease-in-out;
    position: relative;
        &:hover {
            transform: scale(1.05);
        }
        
        @media (max-width: 1400px) {
            width: 350px;
        }
        @media (max-width: 1200px) {
            width: 280px;
        }
        @media (max-width: 568px) {
            width: 200px;
            margin: 0;
            padding: 1rem .5rem;
            box-shadow: none;
            background: transparent;
            cursor: default;
            
            
            &:hover {
            transform: scale(1.15);
        }
        }
    
    img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
    }
   `

const NotData = styled.div`
    display:flex;
    flex-direction: column;
    width: 60%;
    margin: 1.6rem auto;
    height: auto;
    align-items: center;
    justify-content: center;
    
    h1 {
        margin: 0 0 1rem 0;
        letter-spacing: 1rem;
        transform: translateY(200px);

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


const DetailId = () => {
    const router = useRouter();
    const { dtId } = router.query;
    const { resultDetail,setResultDetail,apiDetail } = useContext(GlobalContext);


    useEffect(() => {
        console.log(router, router.query.dtId)
        const fetch = async () => {
            const res = await apiDetail(dtId);
            setResultDetail(res);
        }
        fetch();
    },[dtId])

    function onClick() {
        router.back()
    }


    return (
        <section>
            {
                resultDetail ? (
                    <DetailComp>
                        <div>
                            <h1>{resultDetail.place_name}</h1>
                        </div>
                        <div>
                            {
                                resultDetail.web_picture_urls.map((img,index) => {
                                    return <Place key={index}>
                                        <img src={img} alt=""/>
                                    </Place>
                                })
                            }
                        </div>
                        <div>
                            <p>{resultDetail.place_information.detail}</p>
                        </div>
                        <button onClick={onClick} type={"button"}>Back</button>
                    </DetailComp>
                ) : (
                    <NotData>
                        <h1>ไม่พบข้อมูล....</h1>
                        <button onClick={onClick} type={"button"}>Back</button>
                    </NotData>
                )
            }
        </section>
    );
}


export default DetailId;
