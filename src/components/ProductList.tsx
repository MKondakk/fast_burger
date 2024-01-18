import React, { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import "../styles/main_page.css";

interface Product {
  _id: string;
  name: string;
  type: string;
  price: number;
  photo: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  //?????

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export { ProductList };
