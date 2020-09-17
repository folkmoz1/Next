import Link from "next/link";
import React from "react";
import { Place } from "../../public/styles/detail.styles";

export const ResultSearch = ({place}) => {

    function checkCat(categories) {
        if (categories === 'RESTAURANT') {
            return '/search/restaurant/[resId]'
        } else if (categories === 'SHOP') {
            return '/search/shop/[shopId]'
        } else if (categories === 'OTHER') {
            return '/search/other/[otherId]'
        } else if (categories === 'ATTRACTION') {
            return '/search/attraction/[locateId]'
        } else {
            return '/search/accommodation/[accomId]'
        }

    }

    function checkKrub(categories) {
        if (categories === 'RESTAURANT') {
            return '/search/restaurant/'
        } else if (categories === 'SHOP') {
            return '/search/shop/'
        } else if (categories === 'OTHER') {
            return '/search/other/'
        } else if (categories === 'ATTRACTION') {
            return '/search/attraction/'
        } else {
            return '/search/accommodation/'
        }

    }

    return (
        <Link href={checkCat(place.category_code)} as={{pathname:`${checkKrub(place.category_code)}${place.place_id}`}}>
            <Place title={'รายละเอียด'} >
                <h2>{place.place_name}</h2>
                { place.thumbnail_url && <div><img src={place.thumbnail_url} /></div> }
                <p>ตำบล : {place.location.sub_district}</p>
                <em>ประเภท : {place.category_code}</em>
            </Place>
        </Link>
    );
}

