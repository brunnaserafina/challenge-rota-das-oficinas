import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import pictureHomepage from "../assets/images/picture-homepage.png";
import logoRotaDasOficinas from "../assets/images/logo-rota-das-oficinas.png";
import { TypeWritter } from "../components/Homepage/TypeWritter";

export default function Homepage() {
  return (
    <Wrapper>
      <div>
        <ImgLogo src={logoRotaDasOficinas} alt="Logo Rota das Oficinas" />
        <h1>
          <TypeWritter text="Teste de" hideCursor />

          <span>
            <TypeWritter text="Programação" delay={1300} hideCursor />
          </span>
        </h1>
        <p>
          Olá, eu sou a Brunna Serafina! Este foi o teste desenvolvido por mim
          com o framework React.js para a vaga de Estágio em Desenvolvimento Web
          da empresa Rota das Oficinas.
        </p>

        <h5>Clique para conferir as tarefas desenvolvidas:</h5>
        <ul>
          <Link to={"/roman-numeral-converter"}>
            Conversor de números romanos
          </Link>
          <Link to={"/game-of-life"}>Jogo da vida</Link>
          <Link to={"/restaurant-bill"}>Divisão de conta de restaurante</Link>
        </ul>
      </div>
      <AnimatedImgIdea src={pictureHomepage} alt="Idea" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 90vh;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 700;
    font-size: 50px;
    color: black;
    height: 100px;
  }

  p {
    width: 400px;
    margin: 20px 0;
    text-align: justify;
  }

  ul {
    display: flex;
    flex-direction: column;
  }

  h5 {
    margin: 10px 0;
    font-weight: 600;
  }

  a {
    text-transform: uppercase;
    margin-bottom: 7px;
    color: #3a5a53;
    font-weight: 600;
    font-size: 15px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    h1 {
      font-size: 38px;
      height: 70px;
    }

    p {
      width: 300px;
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 30px;
      text-align: center;
      height: fit-content;
    }

    p {
      width: 80vw;
      text-align: center;
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h5 {
      text-align: center;
    }

    a {
      text-align: center;
    }
  }
`;

const ImgLogo = styled.img`
  width: 180px;
  margin-bottom: 10px;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 130px;
  }
`;

const ImgIdea = styled.img`
  width: 550px;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 420px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(-2.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-2.5deg);
  }
`;

const AnimatedImgIdea = styled(ImgIdea)`
  animation: ${rotateAnimation} 6s infinite linear;
`;
