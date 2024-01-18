import React from 'react';

interface ProductItemProps {
  product: {
    _id: string;
    name: string;
    type: string;
    price: number;
    photo: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="product-item">
      <img src={product.photo} alt={product.name} style={{ height: '150px', width: 'auto' }} />
      <div>
        <p>{product.name}</p>
        <p>{product.type}</p>
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export { ProductItem };
