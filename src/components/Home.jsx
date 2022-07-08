import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Home() {
  return (
    <>
      <Link to="/main">
        <Logo src="image/beHonest.png" />
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
    opacity: 0.8;
    transform: scale(1.05);
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
