import React from "react";
import styled from "styled-components";

//interface CustomInputProps {
// newAuthorRef: RefObject<HTMLInputElement>;
// onKeyEnterNewAuthor: (e: React.KeyboardEvent) => void;
//}

const CustomInput: React.FC<{
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onChange }) => {
  return <StyledInput placeholder="Search..." onChange={onChange} />;
};

export { CustomInput };

const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};

  width: 60%;
  transition: border-color 0.25s;

  &:focus {
    border-color: ${({ theme }) => theme.borders};
    outline: none;
  }
`;
