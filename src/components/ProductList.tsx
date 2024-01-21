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

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export { ProductList };
