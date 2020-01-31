import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    margin: 2% 25%;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(31,9,121,1) 42%, rgba(0,212,255,1) 100%);
    border-radius: 10px;
`

const Cards = ({person}) => {
    return (
        <div className="card-list">
            
            {person.map(card => (
                <CardContainer>
                <div className="card" key={card.id}>
                    <h1>Member Created</h1>
                    <h2>Name: {card.name}</h2>
                    <h3>Email: {card.email}</h3>
                    <h4>Password Length: {card.password.length} characters</h4>
                </div>
                </CardContainer>
            ))}
            
        </div>
    );
};

export default Cards