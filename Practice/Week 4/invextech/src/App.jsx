import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Spinner from "./components/Spinner/Spinner";
function App() {
  const [products, setProducts] = useState({});
  const [fetchProduct, setFetchProduct] = useState([]);
  const [cart, setCart] = useState([]);

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        let data = await response.json();
        data = data.products;
        setFetchProduct(data);

        data = data.reduce((acc, item) => {
          const key = item.category;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(item);

          return acc;
        }, {});

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log("Fetch error:", error);
        setLoading(false);
        setError(true);
      }
    })();
  }, []);

  const handleCard = (id) => {
    const productToAdd = fetchProduct.find((product) => product.id === id);
    !cart.some((product) => product.id === id) &&
      setCart([...cart, productToAdd]);
  };
  const handleDelete = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };
  return (
    <>
      <div className="cart">
        <p
          className="close"
          onClick={(e) => {
            e.currentTarget.parentElement.parentElement.querySelector(
              ".cart",
            ).style.right = "-100%";
          }}
        >
          ✕
        </p>
        <h1>Cart</h1>
        <div className="cart-products">
          {cart.length === 0 ? (
            <h2>No Product</h2>
          ) : (
            cart.map((product) => (
              <div className="cart-product">
                <img src={product.images[0]} alt="" />
                <div>
                  <p>{product.title}</p>
                  <p>{product.price}$</p>
                </div>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
      <header>
        <h2>Shop</h2>
        <div
          className="cart-icon"
          onClick={(e) => {
            e.currentTarget.parentElement.parentElement.querySelector(
              ".cart",
            ).style.right = "0px";
          }}
        >
          🛒 {cart.length > 0 && <p>{cart.length}</p>}
        </div>
      </header>
      {isLoading && !error ? (
        <Spinner />
      ) : !isLoading && error ? (
        <h1>Error Occurred</h1>
      ) : products.length === 0 ? (
        <h1>No Product</h1>
      ) : (
        Object.entries(products).map(([category, items]) => (
          <div key={category}>
            <h1>{category.toUpperCase()}</h1>
            <ul>
              {items.map((product, i) => (
                <Card
                  key={product.id}
                  product={product}
                  handleCard={handleCard}
                />
              ))}
            </ul>
          </div>
        ))
      )}
    </>
  );
}

export default App;
