import { FaSun, FaMoon } from "react-icons/fa";
import styled from "styled-components";

interface DarkModeProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DarkMode: React.FC<DarkModeProps> = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <IconWrapper onClick={toggleDarkMode}>
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </IconWrapper>
  );
};

export { DarkMode };

const IconWrapper = styled.div`
  font-size: 2em;
  display: flex;
  align-items: center;
`;

const SunIcon = styled(FaSun)`
  color: ${({ theme }) => theme.text};
`;

const MoonIcon = styled(FaMoon)`
  color: ${({ theme }) => theme.text};
`;
