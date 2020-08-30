import React from 'react';
import { useRouter } from "next/router";
import Head from "next/head";

//import module
import getUsers from "../../mock/users";
import { UserInfo } from "../../../public/styles/user.styles";


export default function blog({user})  {
    const router = useRouter();
    const { id } = router.query;


    return (
        <section className={'hero'} style={{background:'#444'}}>
            <UserInfo>
                <Head>
                    <title>{user.name}</title>
                </Head>
                <div>
                    <div>
                        <img src={user.img} />
                    </div>
                    <div>
                        <h2>{user.name} <span>{user.pos}</span></h2>
                        <p> age : {user.age}</p>
                    </div>
                    <button
                        type={"button"}
                        onClick={()=>router.back()}
                    >back</button>
                </div>
            </UserInfo>
        </section>
    );

}

export const getStaticPaths = async () => {
    const users = getUsers;
    const paths = await users.map(user => ({params:{userId: user.id.toString()}}))

    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async ({params}) => {
    const users = getUsers;
    const user = users.find(user => user.id.toString() === params.userId)

    return {
        props: {
            user
        }
    }
}

