import React, {Fragment} from 'react';
import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

const IndexDiv = styled.div`
        text-align: center;
        font-family: Arial,san-serif;
        
        > div {
            height: 70px;
            margin-top: 2rem;
            display: flex;
            justify-content: space-evenly;
        }
        
        a {
            height: 45px;
            width: 170px;
            color: #fff;
            background: ${props => props.theme.colors.secondary};
            line-height: 45px;
            border-radius: 22px;
            box-shadow: 2px 5px 20px 5px #444;
            transition: .2s;
            
            &:hover {
                transform: scale(1.1);
                box-shadow: 2px 5px 12px 0px #444;
                letter-spacing: .7px;
            }
        }
`

function Index() {

    return (
        <section className={'hero'}>
            <div className={'container'}>
                <IndexDiv>
                    <Head>
                        <title>FOLK | Tourist</title>
                    </Head>

                    <h1>Welcome There Tourist</h1>
                    <div>
                        <Link href={'/search'} passHref>
                            <a>
                                Search your need.
                            </a>
                        </Link>
                        <Link href={'/users'} passHref>
                            <a>
                                My Team
                            </a>
                        </Link>
                    </div>
                </IndexDiv>
            </div>
        </section>
    );

}

export default Index;
