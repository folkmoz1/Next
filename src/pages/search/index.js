import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { GlobalContext } from "../../Context/Context";

import Aos from 'aos';

const SearchComp = styled.div`
    display:flex;
    flex-direction: column;
    width: 60%;
    margin: 1.6rem auto;
    height: auto;
    align-items: flex-start;
    justify-content: flex-start;
    
        @media (max-width: 568px) {
            align-items: center;
            width: 100%;
        }
    
    h1 {
        margin: 0 0 1rem 0;
    }
    
    > div:nth-of-type(1){
        padding: 0 1rem;
        border-radius: 24px;
        transform: translateX(-30px);
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        
            @media (max-width: 568px) {
                width: 100%;
                height: 65px;
                display: inline-flex;
                border-radius: 0;
                z-index: 1524;
                transform: translateX(0);
                position: sticky;
                top:0;
                background: #fff;
                box-shadow: none;
                border-bottom: 1px solid #dddfe2;
                
                input {
                    width:50%;
                    text-align: center;
                    margin: 0;
                    transition: .2s ease;
                    position: relative;
                    
                    
                    &:not(:placeholder-shown) {
                        color: #fa05a4;
                        font-size: 1rem;
                    }

                }
            }
    }
     > div:nth-of-type(2){
        padding: 0 1rem;
        border-radius: 24px;
        transform: translateX(-30px);
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-flow: wrap row;
        margin: 1rem 0;
        
            @media (max-width: 568px) {
                box-shadow: none;
                transform: translateX(0);
            }
        
             
    }
    
    input {
        outline: none;
        margin: .5rem 0;
        padding: .5rem 1rem;
        background: transparent;
        font-size: 1.2rem;

        &:focus {
            outline: none;
            color: tomato;
        }
    }
`

const Place = styled.div`
    width: 450px;
    height: auto;
    padding: 1rem;
    margin: 1.2rem auto;
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
            
            p {
                
            }
            
            em {
                opacity: 1;
            }
        }
        @media (max-width: 1568px) {
            width: 380px;
            cursor: default;
            
            em {
                font-size: .8rem;
            }
        }
        @media (max-width: 568px) {
            width: 330px;
        }
    
    > div {
        width: 120px;
        height: 120px;
        margin: 0 auto;
        float: right;
    }
    
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
    }
    
    h2 {
        margin: 1.2rem 0 1rem 0;
    }
    
    p {
        margin: 2.3rem;
    }
    
    em {
        transition: .2s ease-in;
        opacity: 0;
        position: absolute;
        bottom: 15%;
        left: 5%;
    }
`

function Index() {
    const [searchValue, setSearchValue] = useState('');
    const [provincesValue, setProvincesValue] = useState('')
    const [search, setSearch] = useState(null)

    const { resultSearch,apiSearch,setResultSearch } = useContext(GlobalContext)

    useEffect(() => {
        Aos.init();
        Aos.refresh();
    },[]);

    useEffect(() => {
        if (search) {
            const fetch = async () => {
              const res =  await apiSearch(search.value1,search.value2);
              setResultSearch(res);
            }
            fetch();
        }

       return () => {
           axios.Cancel
       }

    },[search])

    function onKeydown(e) {
        if (e.key === 'Enter') {
            if (searchValue || provincesValue) {
                setSearch({value1: provincesValue,value2: searchValue});
                setSearchValue('')
            }
        }
    }

    return (
        <SearchComp>
            <Head>
                <title>Search</title>
            </Head>

            <h1>Search</h1>
            <div>
                <input
                    type={'text'}
                    placeholder={'จังหวัด'}
                    onChange={e=>setProvincesValue(e.target.value)}
                    value={provincesValue}
                    onKeyDown={onKeydown}
                />
                <input
                    type={'text'}
                    placeholder={'search it'}
                    onChange={e=>setSearchValue(e.target.value)}
                    value={searchValue}
                    onKeyDown={onKeydown}
                />
            </div>
            <div>
            { resultSearch ? resultSearch.slice(0,30).map((place, index) => {
                return(
                    <Link href={{pathname: '/search/[dtId]'}} as={{pathname:`/search/${place.place_id}`}} key={place.place_id}>
                            <Place title={'รายละเอียด'} data-aos={'fade-up'} data-aos-duration={`1s`} >
                                <h2>{place.place_name}</h2>
                            { place.thumbnail_url && <div><img src={place.thumbnail_url} /></div> }
                                <p>ตำบล : {place.location.sub_district}</p>
                                <em>ประเภท : {place.category_code} </em>
                            </Place>
                    </Link>

                )
            }) : null }
            </div>
        </SearchComp>
    );
}


export default Index;
