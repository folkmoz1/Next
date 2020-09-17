import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { GlobalContext } from "../../Context/Context";
import {ResultSearch} from "../../components/ResultSearch";

const SearchComp = styled.div`
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
        padding: 0 1rem;
        border-radius: 24px;
        transform: translateX(-30px);
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-flow: wrap row;
        margin: 1rem 0;
    }
    
    input {
        outline: none;
        margin: .5rem 0;
        padding: .5rem 1rem;
        background: transparent;
        &:focus {
            outline: none;
            color: tomato;
        }
    }
`



function Index() {
    const [searchValue, setSearchValue] = useState('');
    const [provincesValue, setProvincesValue] = useState('')
    const [search, setSearch] = useState(null)

    const { resultSearch,apiSearch,setResultSearch } = useContext(GlobalContext)



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
            { resultSearch ? resultSearch.slice(0,30).map((place,index) => {
                return(
                        <ResultSearch place={place} key={index} />
                )
            }) : null }
            </div>
        </SearchComp>
    );
}


export default Index;
