import { CustomButton } from "../CustomButton/CustomButton";
import styled from "styled-components";

interface ErrorProps {
  fetchData: () => void;
}

const Error: React.FC<ErrorProps> = ({ fetchData }) => {
  return (
    <>
      <StyledError>Error</StyledError>
      <CustomButton handleClick={fetchData} text={"Refresh"} />
    </>
  );
};

export { Error };

const StyledError = styled.h2`
  color: ${({ theme }) => theme.text};
`;
