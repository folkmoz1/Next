import axios from "axios";

export async function apiDetail(params) {
    const res = await axios.get('https://tatapi.tourismthailand.org/tatapi/v5/attraction',{
        headers: {
            'Content-Type' : 'Application/json;charset=utf-8',
            'Authorization' : `Bearer${process.env.NEXT_PUBLIC_MY_API_KEY}`,
            'Accept-Language' : 'th'
        },
        params: {
            place_id: `${params}`
        }
    }).then(res => {
        console.log(res);
        return res.data.result
    }).catch(err => {
        console.log(err)
    })
    return res;
}
export async function apiSearch(keyword) {
    const res = await axios.get(`https://tatapi.tourismthailand.org/tatapi/v5/places/search`, {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
            'Accept-Language': 'th'
        },
        params: {
            keyword: `${keyword}`,
            location: "13.6904831,100.5226014",
            provinceName: `กระบี่`

        }
    }).then(res => {
        console.log(res.data.result);
        return res.data.result;
    }).catch(err => {
        console.log(err)
    })

    return res;
}
