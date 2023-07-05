import styled, { css } from "styled-components";

interface PaginationProps {
  setCurrent: (page: number) => void;
  currentPage: number;
  authors: object[] | undefined;
}

interface PaginationButtonProps {
  isActive: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  setCurrent,
  currentPage,
  authors,
}) => {
  return (
    <PaginationContainer>
      {authors?.length &&
        [...Array(Math.ceil(authors.length / 5))].map((_, i) => (
          <PaginationButton
            key={i}
            onClick={() => setCurrent(i)}
            isActive={currentPage / 5 === i}
          >
            {i}
          </PaginationButton>
        ))}
    </PaginationContainer>
  );
};

export { Pagination };

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  height: auto;
`;

const activeButtonStyles = css`
  font-weight: bold;
`;

const PaginationButton = styled.button<PaginationButtonProps>`
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  width: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  ${({ isActive }) => isActive && activeButtonStyles}

  &:focus {
    outline: none;
    font-size: 16.7px;
  }
`;
