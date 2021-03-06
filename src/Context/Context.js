import React, { createContext, useState } from 'react';
import { apiSearch } from "../mock/api";
import axios from "axios";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [resultSearch, setResultSearch] = useState(null);
    const [resultDetail, setResultDetail] = useState(null);

     async function apiSearch(province,keyword,categories) {
        const res = await axios.get(`https://tatapi.tourismthailand.org/tatapi/v5/places/search`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
                'Accept-Language': 'th'
            },
            params: {
                keyword: `${keyword}`,
                location: "13.6904831,100.5226014",
                categories: `${categories}`,
                provinceName: `${province}`

            }
        }).then(res => {
            console.log(res.data.result);
            return res.data.result;
            setResultSearch(res.data.result)
        }).catch(err => {
            console.log(err)
        })

        return res;
    }

    async function apiDetail(params,categories) {
        const res = await axios.get(`https://tatapi.tourismthailand.org/tatapi/v5/${categories}/${params}`,{
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
                'Accept-Language': 'th'
            }
        }).then(res => {
            console.log(res);
            return res.data.result
            setResultDetail(res.data.result)
        }).catch(err => {
            console.log(err)
        })
        return res;
    }

    return (
        <GlobalContext.Provider value={{
            resultSearch,resultDetail,setResultDetail,setResultSearch,
            apiSearch,apiDetail
        }}>
            {children}
        </GlobalContext.Provider>
    );

}

export default GlobalProvider;
