import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/main">
        <Logo src="image/beHonest.png" />
        <ClickText>CLICK !</ClickText>
      </Link>
      <Title>Be honest .</Title>
    </>
  );
}

const Logo = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;

  :hover {
    opacity: 0.6;
    transform: scale(1.05);
  }
`;

const ClickText = styled.div`
  position: absolute;
  bottom: 40%;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 80px;
  opacity: 0;
  background-color: white;
  color: red;
  padding: 10px;
  border-radius: 15px;

  :hover {
    opacity: 1;
  }
`;

const Title = styled.div`
  font-family: "Splash", cursive;
  font-style: normal;
  font-weight: 400;
  font-size: 120px;
  letter-spacing: -0.03em;
  color: #d33c0f;
  clip-path: inset(0 11ch 0 0);
  animation: l 3s steps(30) infinite;

  @keyframes l {
    to {
      clip-path: inset(0 0 0 0);
    }
  }

  :hover {
    color: #131373;
    transform: scale(1.05);
  }
`;

export default Home;
