import { useState } from "react";
import styled from "styled-components";
import romanIllustration from "../assets/images/roman.png";
import Header from "../components/Header/Header";

const romanToArabicMap = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

export default function RomanNumeralConverter() {
  const [romanNumeral, setRomanNumeral] = useState("");
  const [arabicNumeral, setArabicNumeral] = useState("");

  function convertToRoman(inputArabicNumeral) {
    let arabicNum = inputArabicNumeral;
    let romanNumeralResult = "";

    if (arabicNum < 1 || arabicNum > 3999) {
      alert("Favor, insira um numeral romano ou arábico entre 1 e 3999.");
      return;
    }

    for (let [symbol, value] of Object.entries(romanToArabicMap)) {
      while (arabicNum >= value) {
        romanNumeralResult += symbol;
        arabicNum -= value;
      }
    }

    setRomanNumeral(romanNumeralResult);

    return romanNumeralResult;
  }

  function convertToArabic() {
    let arabicNumeralResult = 0;
    let romanNum = romanNumeral.toUpperCase();

    for (let i = 0; i < romanNum.length; i++) {
      const currentValue = romanToArabicMap[romanNum[i]];
      const nextValue = romanToArabicMap[romanNum[i + 1]];

      if (nextValue > currentValue) {
        arabicNumeralResult -= currentValue;
      } else {
        arabicNumeralResult += currentValue;
      }
    }

    convertToRoman(arabicNumeralResult);

    setArabicNumeral(arabicNumeralResult);
  }

  return (
    <Background>
      <Header />
      <Wrapper>
        <h1>Conversor de números romanos</h1>

        <div>
          <span>
            <h2>Arábico: </h2>
            <input
              type="number"
              value={arabicNumeral}
              onChange={(e) => setArabicNumeral(e.target.value)}
              autoFocus
            />
            <button onClick={() => convertToRoman(arabicNumeral)}>
              Converter para romano
            </button>
          </span>

          <span>
            <h2>Romano: </h2>
            <input
              type="text"
              value={romanNumeral}
              onChange={(e) => setRomanNumeral(e.target.value)}
            />
            <button onClick={convertToArabic}>Converter para arábico</button>
          </span>
        </div>
      </Wrapper>

      <img src={romanIllustration} alt="Roman" />
    </Background>
  );
}

const Background = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  margin-top: 15vh;

  h1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    margin: 20px 0;
  }

  h2 {
    width: 60px;
    font-weight: 600;
  }

  div {
    background-color: var(--green);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span {
    display: flex;
    align-items: center;
    padding: 20px;
  }

  input {
    margin: 0 10px;
    border-radius: 5px;
    border: none;
    height: 25px;
  }

  button {
    background-color: var(--dark-green);
    color: white;
    border-radius: 5px;
    border: none;
    height: 25px;
    cursor: pointer;
  }
`;
