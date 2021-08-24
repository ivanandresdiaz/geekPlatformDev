import styled from "styled-components";

export const ContainerTeachers = styled.div`
  width: auto;
  margin: 20px auto;
  height: auto;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  background: "white";
  margin-bottom: 20px;
`;

export const TeachersContent = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    background-color: tomato;
  }

  ::hover {
    background-color: #e6354b;
  }
`;
