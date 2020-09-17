import React from "react";
import { DetailComp, Place } from "../../public/styles/detail.styles";
import {useRouter} from "next/router";

export const Detail_Component = ({result}) => {
    const router = useRouter()

    function onClick() {
        router.back()
    }

    console.log(result)
    return (
        <DetailComp>
            <div>
                <h1>{result.place_name}</h1>
            </div>
            <div>
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
                {
                    result.place_information.detail ? <p>{result.place_information.detail}</p>
                    : result.place_information.introduction ? <p>{result.place_information.introduction}</p>
                    : <p>ไม่มีข้อมูลรายละเอียด ขออภัย..</p>
                }
            </div>
            <button onClick={onClick} type={"button"}>Back</button>
        </DetailComp>
    );
}
