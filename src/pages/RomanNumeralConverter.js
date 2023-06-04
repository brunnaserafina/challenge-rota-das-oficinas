import { useState } from "react";
import styled from "styled-components";

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
    <Wrapper>
      <h1>Conversor de números romanos</h1>

      <div>
        <span>
          <h2>Arábico: </h2>
          <input
            type="number"
            value={arabicNumeral}
            onChange={(e) => setArabicNumeral(e.target.value)}
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
  );
}

const Wrapper = styled.div`
  h1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    margin: 20px 0;
  }

  h2 {
    width: 60px;
  }

  div {
    background-color: #93e7d3;
    border-radius: 10px;
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
    background-color: #000000;
    color: white;
    border-radius: 5px;
    border: none;
    height: 25px;
    cursor: pointer;
  }
`;
