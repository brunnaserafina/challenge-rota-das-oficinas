import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi";
import { BsCaretDownFill } from "react-icons/bs";

export default function Header() {
  const location = useLocation();
  const [page, setPage] = useState("");
  const [viewMenu, setViewMenu] = useState(false);

  useEffect(() => {
    if (location.pathname === "/roman-numeral-converter") {
      setPage("Roman Numeral Converter");
    } else if (location.pathname === "/restaurant-bill") {
      setPage("Restaurant Bill Divider");
    } else {
      setPage("Game of Life");
    }
  }, [location.pathname]);

  return (
    <Wrapper>
      <Link to={"/"}>
        <HiHome fontSize={"30px"} color={"var(--dark-green)"} />
      </Link>

      <div onClick={() => setViewMenu(!viewMenu)}>
        <p>{page}</p>
        <BsCaretDownFill fontSize={"20px"} color={"var(--dark-green)"} />
      </div>

      <Menu viewMenu={viewMenu}>
        <Link to={"/roman-numeral-converter"}>
          Conversor de números romanos
        </Link>
        <Link to={"/game-of-life"}>Jogo da vida</Link>
        <Link to={"/restaurant-bill"}>Divisor de contas de restaurante</Link>
      </Menu>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--green);
  position: fixed;
  top: 0;
  left: 0;

  > a {
    margin-left: 30px;
    display: flex;
    align-items: end;
    text-decoration: none;
    color: var(--dark-green);
    font-weight: 600;
    font-size: px;
  }

  > a:hover {
    text-decoration: underline;
  }

  div {
    margin-right: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  p {
    color: var(--dark-green);
    font-weight: 600;
    margin-right: 10px;
  }
`;

const Menu = styled.ul`
  position: fixed;
  right: 0;
  top: 50px;
  padding: 15px 35px;
  background-color: var(--green);
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  max-height: ${({ viewMenu }) => (viewMenu ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease;
  visibility: ${({ viewMenu }) => (viewMenu ? "visible" : "hidden")};

  a {
    margin-bottom: 7px;
    color: var(--dark-green);
    font-weight: 500;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
