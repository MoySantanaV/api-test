import styled from "styled-components";
import "../../index.css";

interface CustomButtonProps {
  text: string;
  handleClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, handleClick }) => {
  return <StyledButton onClick={handleClick}>{text}</StyledButton>;
};

export { CustomButton };

const StyledButton = styled.button`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: ${({ theme }) => theme.borders};
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
