import { useMemo } from "react";
import styled from "styled-components";

interface Author {
  id: number;
  created_date: string;
  updated_date: string;
  display_name: string;
}

interface TableProps {
  authors: Author[] | undefined;
  currentPage: number;
}

const Table: React.FC<TableProps> = ({ authors, currentPage }) => {
  const visibles = useMemo(() => {
    return authors?.slice(currentPage, currentPage + 5);
  }, [authors, currentPage]);

  const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate.replace(/\//g, "-");
  };

  return (
    <div>
      <TableContainer>
        <StyledTable>
          <thead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Created Date</TableHeader>
              <TableHeader>Updated Date</TableHeader>
              <TableHeader>Author Name</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {visibles &&
              visibles.map(
                ({ id, created_date, updated_date, display_name }, index) => (
                  <TableRow key={id}>
                    <TableData>{currentPage + index + 1}</TableData>
                    <TableData>{formatDate(created_date)}</TableData>
                    <TableData>{formatDate(updated_date)}</TableData>
                    <TableData>{display_name}</TableData>
                  </TableRow>
                )
              )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export { Table };

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  min-width: 300px;
  max-width: 1000px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  font-weight: bold;
  text-align: center;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  color: ${({ theme }) => theme.text};
`;

const TableData = styled.td`
  text-align: center;
  padding: 0.8rem;
  border-bottom: 1px solid #ddd;
`;
