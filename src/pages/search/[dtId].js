import React,{ useContext, useState, useEffect} from 'react';
import { GlobalContext } from "../../Context/Context";
import { useRouter } from "next/router";
import styled from "styled-components";

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

    function onLoad() {
        setTimeout(() => {
            router.push('/search')
        },2000)
    }

    return (
        <section>
            {
                resultDetail ? (
                    <DetailComp>
                        <h1>This : {resultDetail.place_name}</h1>
                        <div style={{display:'flex'}}>
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
                        <h1>ไม่มีข้อมูล....</h1>
                        <button onClick={onClick} type={"button"}>Back</button>
                    </NotData>
                )
            }
        </section>
    );
}


export default DetailId;
