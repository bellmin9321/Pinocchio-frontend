import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
      <div className="image_box">
        <img height={"650"} src="image/Error_Image.png" />
      </div>
      <div className="error_box">
        <div className="error_number">404</div>
        <div className="error_text">Page Not Found</div>
        <button className="home_btn" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </NotFoundLayout>
  );
}

const NotFoundLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 96%;
  height: 90%;
  border-radius: 30px;
  background-color: white;

  .image_box {
    width: 30%;
  }

  .error_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }

  .error_number {
    color: red;
    font-size: 150px;
  }

  .error_text {
    color: red;
    font-size: 50px;
  }

  .home_btn {
    width: 150px;
    height: 70px;
    margin-top: 50px;
    font-size: 30px;
    font-weight: bold;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #1c6aaa;
    color: white;
    cursor: pointer;

    :hover {
      opacity: 0.7;
      transform: scale(1.03);
    }
  }
`;

export default NotFound;
