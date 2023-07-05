import React, { useEffect, useState } from "react";
import { DarkMode } from "../DarkMode/DarkMode";
import { toast } from "react-toastify";
import { Table } from "../Table/Table";
import { Pagination } from "../Pagination/Pagination";
import { Loading } from "../Loading/Loading";
import { Error } from "../Error/Error";
import { CustomInput } from "../CustomInput/CustomInput";
import styled from "styled-components";

interface AppManagementProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

interface Author {
  id: number;
  created_date: string;
  updated_date: string;
  display_name: string;
}

const AppManagement: React.FC<AppManagementProps> = ({
  toggleDarkMode,
  isDarkMode,
}) => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.openalex.org/authors");
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.results);
        setIsError(false);
        toast.success("All authors were loaded", {
          theme: `${isDarkMode ? "dark" : "light"}`,
        });
      } else {
        setIsError(true);
        toast.error(
          "An error occurs while loading authors, please refresh or contact the admin if this issue persist",
          { theme: `${isDarkMode ? "dark" : "light"}` }
        );
      }
    } catch (error) {
      toast.error(
        "An error occurs while loading authors, please refresh or contact the admin if this issue persist",
        { theme: `${isDarkMode ? "dark" : "light"}` }
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchAuthor(value);
    setCurrentPage(0);
  };

  const filterAuthors = (
    authors: Author[] | undefined,
    searchTerm: string
  ): Author[] | undefined => {
    if (!authors) {
      setIsError(true);
      return;
    }

    const filteredAuthors = authors.filter((author: Author) =>
      author.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAuthors;
  };

  const filteredAuthors = isError ? [] : filterAuthors(authors, searchAuthor);

  const setCurrent = (pageNumber: number) => {
    setCurrentPage(pageNumber * 5);
  };

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error fetchData={fetchData} />
  ) : (
    <AppManagementContainer>
      <Wrap>
        <CustomInput onChange={onChangeInput} />
        <DarkMode toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </Wrap>
      <ContentContainer>
        <Pagination
          setCurrent={setCurrent}
          currentPage={currentPage}
          authors={filteredAuthors}
        />

        {(filteredAuthors?.length ?? 0) > 0 ? (
          <Table authors={filteredAuthors} currentPage={currentPage} />
        ) : (
          <NoAuthorsFound>
            No authors found. Please try a different search.
          </NoAuthorsFound>
        )}
      </ContentContainer>
    </AppManagementContainer>
  );
};

export { AppManagement };

const AppManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  width: 300px;
`;

const NoAuthorsFound = styled.p`
  text-align: center;
  font-size: 1.2em;
  color: #555;
  margin: 20px 0;
`;
