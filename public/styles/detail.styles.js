import styled from "styled-components";


export const DetailComp = styled.div`
    display:flex;
    flex-direction: column;
    width: 96%;
    margin: 1.6rem auto;
    height: auto;
    align-items: center;
    justify-content: center;
        
        @media (max-width: 1400px) {
            margin: 0;
            width: 100%;
        }
    
        @media (max-width: 568px) {
            overflow: hidden;
            align-items: flex-start;
        }
    
    h1 {
        margin: 0 0 1rem 0;
        
        @media (max-width: 568px) {
            text-align: center;
            width: 100%;
            font-size: 1.7rem;
            margin: 2.7rem 0 1.3rem;
            letter-spacing: 2px;
        }
    }
    > div:nth-of-type(1) {
        width: 100%;
        
    }
    
    > div:nth-of-type(2){
        padding: 0 1rem;
        border-radius: 24px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-wrap: nowrap;
            
            @media (max-width: 900px) {
                justify-content: center;
                align-items: center;
               
               > div:nth-of-type(3) {
                    display: none;
               }
            }
            
            @media (max-width: 568px) {
               border-radius: 8px;
               width: 100%;
               
            }
    }
     > div:nth-of-type(3){
        padding: 1.4rem 1.9rem;
        width: 100%;
        height: 400px;
        border-radius: 24px;
        box-shadow: 2px 5px 15px 0px rgba(219, 204, 193, 1);
        display: flex;
        flex-flow: wrap row;
        margin: 1rem 0;
        
            @media (max-width: 1400px) {
                width: 85%;
            }
            @media (max-width: 1100px) {
                padding: 1.2rem 2rem;
                height: auto;
                margin: 1rem auto;
            }
        
            @media (max-width: 568px) {
                width: 95%;
                transform: translateX(0);
                letter-spacing: .9px;
                
                button {
                    cursor: default;
                }
            }
        
             
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

export const Place = styled.div`
    width: 400px;
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
            
            em {
                font-size: .8rem;
            }
        }
        @media (max-width: 568px) {
            width: 330px;
            cursor: default;
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

export const NotData = styled.div`
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



