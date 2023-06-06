import React, { useState } from "react";
import styled from "styled-components";
import SelectConsumers from "../components/RestaurantBillSplitter/SelectConsumers";

export default function RestaurantBillSplitter() {
  const [viewDescribeProducts, setViewDescribeProducts] = useState(true);
  const [viewSelectConsumers, setViewSelectConsumers] = useState(false);
  const [customers, setCustomers] = useState(["", ""]);
  const [products, setProducts] = useState([
    { product: "", value: "", quantity: "1", consumersQuantity: 0 },
  ]);
  const [totalValueProducts, setTotalValueProducts] = useState(0);

  const addProduct = () => {
    setProducts([
      ...products,
      { product: "", value: "", quantity: "1", consumersQuantity: 0 },
    ]);
  };

  const addCustomer = () => {
    setCustomers([...customers, ""]);
  };

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const removeCustomer = (index) => {
    if (customers.length > 2) {
      const newCustomers = [...customers];
      newCustomers.splice(index, 1);
      setCustomers(newCustomers);
    }
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const newProducts = [...products];
    newProducts[index][name] = value;
    setProducts(newProducts);
  };

  const calculateTotalValue = () => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const value = parseFloat(product.value);
      const quantity = parseInt(product.quantity);
      if (!isNaN(value) && !isNaN(quantity)) {
        total += value * quantity;
      }
    }
    setTotalValueProducts(total);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    calculateTotalValue();
    setViewDescribeProducts(false);
    setViewSelectConsumers(true);
  };

  return (
    <>
      <Title>Divisor de conta de restaurante</Title>

      {viewDescribeProducts && (
        <Form onSubmit={handleConfirm}>
          <BackgroundForm>
            {products.map((product, productIndex) => (
              <div key={productIndex}>
                <span>
                  <InputProduct>
                    <label htmlFor="product">Produto:</label>
                    <input
                      type="text"
                      name="product"
                      value={product.product}
                      onChange={(event) =>
                        handleProductChange(productIndex, event)
                      }
                      required
                    />
                  </InputProduct>

                  <InputValue>
                    <label htmlFor="value">Valor:</label>
                    <input
                      type="number"
                      name="value"
                      value={product.value}
                      onChange={(event) =>
                        handleProductChange(productIndex, event)
                      }
                      required
                    />
                  </InputValue>

                  <InputQuantity>
                    <label htmlFor="quantity">Qtd:</label>
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      min="1"
                      onChange={(event) =>
                        handleProductChange(productIndex, event)
                      }
                      required
                    />
                  </InputQuantity>

                  {products.length > 1 && (
                    <ButtonRemove onClick={() => removeProduct(productIndex)}>
                      x
                    </ButtonRemove>
                  )}
                </span>
              </div>
            ))}

            <button onClick={addProduct}>+ Adicionar produto</button>

            {customers.map((customer, customerIndex) => (
              <div key={customerIndex}>
                <span>
                  <div>
                    <label htmlFor="customer">Cliente:</label>
                    <InputCustomer
                      type="text"
                      name="customer"
                      value={customer}
                      onChange={(event) => {
                        const newCustomers = [...customers];
                        newCustomers[customerIndex] = event.target.value;
                        setCustomers(newCustomers);
                      }}
                      required
                    />
                  </div>

                  {customers.length > 2 && (
                    <ButtonRemove onClick={() => removeCustomer(customerIndex)}>
                      x
                    </ButtonRemove>
                  )}
                </span>
              </div>
            ))}

            <button onClick={addCustomer}>+ Adicionar cliente</button>
          </BackgroundForm>

          <button type="submit">Confirmar</button>
        </Form>
      )}

      {viewSelectConsumers && (
        <SelectConsumers
          totalValueProducts={totalValueProducts}
          customers={customers}
          products={products}
        />
      )}
    </>
  );
}

const Title = styled.h1`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  margin: 10px 0;
  text-align: center;
`;

const BackgroundForm = styled.div`
  background-color: #93e7d3;
  border: 1px solid #3a5a53;
  padding: 20px;
  width: 400px;
  border-radius: 5px 5px 0px 0px;

  button {
    background-color: #3a5a53;
    border: none;
    height: 25px;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
`;

const InputProduct = styled.div`
  width: 100%;
  margin-right: 5px;
`;

const InputValue = styled.div`
  width: 60px !important;
  margin-right: 5px;
`;

const InputQuantity = styled.div`
  width: 35px !important;
`;

const InputCustomer = styled.input`
  width: 100%;
`;

const ButtonRemove = styled.button`
  margin-left: 10px;
  height: 22px;
  border: none;
  border-radius: 5px;
  background-color: #ff6b64 !important;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  padding: 20px;

  span {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  input {
    height: 20px;
    border-radius: 5px;
    border: none;
  }

  label {
    font-weight: 600;
  }

  > button {
    background-color: #3a5a53;
    border: none;
    border-radius: 0px 0px 5px 5px;
    color: white;
    font-size: 15px;
    font-weight: 600;
    height: 25px;
    width: 101%;
    margin-top: 2px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  div {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
`;
