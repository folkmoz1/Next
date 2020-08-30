import styled from "styled-components";

export const UserInfo = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    
    > div {
        height: 500px;
        width: 350px;
        margin: 0 auto;
        display: flex;
        flex-flow: wrap column;
        align-items: center;
        justify-content: center;
        background: #e5e6e7;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(255,255,255,.7);
    }
    > div > div:nth-child(1) {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        margin: 0 0 2rem 0;
        transform: translateY(-30px);
        pointer-events: none;
    }
    > div > div:nth-child(2) {
        text-align: center;
        line-height: 30px;
    }
    h2 {
        font-size: 3rem;
        margin-bottom: .5rem;
        transform: translateY(-10px);
    }
    p {
        font-size: 2rem
    }
    img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(0,0,0,.4);
    }
    button {
        padding: 0.5rem 1rem;
        margin: 1.5rem 0 0 0;
        background: #444444;
        color: #fff;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 12px;
        box-shadow: 0 0 10px #000;
        transition: 0.3s;
        
        &:hover {
            transform: scale(1.1);
            background: #e5e6e7;
            border: 1px solid #444;
            color: #444444;
            box-shadow: 0 0 3px #444;
            border-radius: 24px;
        }
        &:active {
            transform: scale(1);
            color: tomato;
        }
    }
    
`
