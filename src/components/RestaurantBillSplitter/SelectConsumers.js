import React, { useState } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import styled from "styled-components";

export default function SelectConsumers({
  totalValueProducts,
  customers,
  products,
  setProducts,
  setViewSelectConsumers,
}) {
  const [customerExpenses, setCustomerExpenses] = useState({});
  const [viewExpensesResult, setViewExpensesResult] = useState(false);

  function calculateBillSplit() {
    const newCustomerExpenses = {};

    customers.forEach((customer) => {
      const valueInitializeExpensesByCustomer = 0;
      newCustomerExpenses[customer] = valueInitializeExpensesByCustomer;
    });

    // Calculate expenses for each customer based on selected products
    customers.forEach((customer, customerIndex) => {
      products.forEach((product, productIndex) => {
        const checkboxId = `product-${customerIndex}-${productIndex}`;
        const checkbox = document.getElementById(checkboxId);

        if (checkbox.checked) {
          const productValue =
            (product.value * product.quantity) / product.consumersQuantity;

          newCustomerExpenses[customer] += productValue;
        }
      });
    });

    // Apply service charge to the customer's expenses if the service checkbox is checked
    customers.forEach((customer, customerIndex) => {
      const serviceCheckboxId = `service-${customerIndex}`;
      const serviceCheckbox = document.getElementById(serviceCheckboxId);
      const serviceCharge = 1.1;

      if (serviceCheckbox.checked) {
        newCustomerExpenses[customer] *= serviceCharge;
      }
    });

    setCustomerExpenses(newCustomerExpenses);
    setViewExpensesResult(true);
  }

  function handleCheckboxChange(customerIndex, productIndex) {
    const checkboxId = `product-${customerIndex}-${productIndex}`;
    const checkbox = document.getElementById(checkboxId);
    const selectedProduct = products[productIndex];

    if (checkbox.checked) {
      selectedProduct.consumersQuantity++;
    } else {
      selectedProduct.consumersQuantity--;
    }
  }

  return (
    <Wrapper>
      {!viewExpensesResult && (
        <SelectCostumersAndProducts>
          <IconBack
            onClick={() => {
              setViewSelectConsumers(false);
              const updatedProducts = products.map((product) => ({
                ...product,
                consumersQuantity: 0,
              }));

              setProducts(updatedProducts);
            }}
          >
            <BsFillArrowLeftCircleFill
              color={"var(--dark-green)"}
              fontSize={"20px"}
            />
          </IconBack>

          <h1>
            <span>Total:</span>
            <span>R${totalValueProducts.toFixed(2).replace(".", ",")}</span>
          </h1>

          <HorizontalBar></HorizontalBar>

          {customers.map((customer, customerIndex) => (
            <div key={customerIndex}>
              <h2>{customer}</h2>

              <span>
                {products.map((product, productIndex) => (
                  <div key={productIndex}>
                    <input
                      type="checkbox"
                      id={`product-${customerIndex}-${productIndex}`}
                      name={`product-${customerIndex}-${productIndex}`}
                      onChange={() =>
                        handleCheckboxChange(customerIndex, productIndex)
                      }
                    />
                    <label htmlFor={`product-${customerIndex}-${productIndex}`}>
                      {product.product}
                    </label>
                  </div>
                ))}

                <div>
                  <input
                    type="checkbox"
                    id={`service-${customerIndex}`}
                    name={`service-${customerIndex}`}
                  />
                  <label htmlFor={`service-${customerIndex}`}>
                    Incluir taxa de serviço
                  </label>
                </div>
              </span>
            </div>
          ))}

          <button onClick={calculateBillSplit}>Dividir conta</button>
        </SelectCostumersAndProducts>
      )}

      {viewExpensesResult && (
        <ExpensesResult>
          <IconBack
            onClick={() => {
              setViewExpensesResult(false);
              const updatedProducts = products.map((product) => ({
                ...product,
                consumersQuantity: 0,
              }));

              setProducts(updatedProducts);
            }}
          >
            <BsFillArrowLeftCircleFill
              color={"var(--dark-green)"}
              fontSize={"20px"}
            />
          </IconBack>

          <h1>Resultado</h1>
          <div>
            {customers.map((customer, index) => (
              <>
                <div>
                  <span>{customer}</span>
                  <span>
                    R${customerExpenses[customer]?.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <HorizontalBar></HorizontalBar>
              </>
            ))}
          </div>
        </ExpensesResult>
      )}
    </Wrapper>
  );
}

const IconBack = styled.span`
  margin-bottom: 10px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectCostumersAndProducts = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: var(--green);
  border-radius: 10px;
  padding: 20px;

  h1 {
    margin-bottom: 5px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 17px;
    display: flex;
    justify-content: space-between;
  }

  h2 {
    font-size: 18px;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: 600;
  }

  input {
    border: none;
  }

  button {
    margin-top: 20px;
    background-color: var(--dark-green);
    color: white;
    border-radius: 5px;
    border: none;
    height: 25px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }

  span {
    display: flex;
    flex-direction: column;
  }
`;

const ExpensesResult = styled.div`
  background-color: var(--green);
  padding: 20px;
  border-radius: 10px;
  width: 350px;

  h1 {
    margin-top: 10px;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-weight: 600;
  }

  span {
    font-weight: 500;
    margin-bottom: 5px;
  }

  > div > div {
    display: flex;
    justify-content: space-between;
  }
`;

const HorizontalBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: #5f7b5e;
  margin-bottom: 10px;
`;
