import React from 'react';
import Link from "next/link";
import styled from "styled-components";

//module
import getUsers from '../../mock/users';
import Head from "next/head";

const Hero = styled.div`
    width:60%;
    height: auto;
    margin: 0 auto;
    display: flex;
    
    
    
    div {
        cursor: pointer;
        background: tomato;
        text-align: center;
        height: 40px;
        width: 50px;
        color: #fff;
        margin: 1rem auto;
    
    }
    
    h3 {
        font-size: 1.5rem;
    }
`

export default function index({users}) {

    return (
        <Hero>
            <Head>
                <title>My- Team</title>
            </Head>
            { users && users.map(user => {
                return (
                    <Link href={'/users/[userId]'} as={`/users/${user.id}`} key={user.id} >
                        <div>
                            <h3>{user.name}</h3>
                        </div>
                    </Link>
                )

            }) }
        </Hero>
    );
}

export const getStaticProps = async () => {
    const users = getUsers;

    return {
        props: {
            users
        }
    }
}
