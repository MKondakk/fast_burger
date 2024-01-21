import React, { useEffect, useState, useCallback } from "react";
import { LoginButton } from "../components/NavigationButtons";
import { ProductList } from "../components/ProductList";
import "../styles/App.css";
import "../styles/main_page.css";
import { Product } from "../components/ProductItem";

const MenuPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState([]);

  const fetchProducts = useCallback(
    async (searchTerm?: string, sortOption?: string, filterOption?: string) => {
      try {
        let url = "http://localhost:5000/products";

        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (sortOption) {
          params.append("sortOption", sortOption);
        }

        if (filterOption) {
          params.append("filterOption", filterOption);
        }

        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    },
    []
  );

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch("http://localhost:5000/types");
        const data = await response.json();
        setProductTypes(data.types || []);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchProductTypes();
  }, []);

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="menu-page">
      <div className="main-header">
        <img
          src="images/logo.png"
          alt="logo"
          style={{ height: "50px", width: "auto" }}
        />
        <h1>Fast Burger</h1>
        <div className="filter">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label>Sort By:</label>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <label>Filter By:</label>
          <select onChange={(e) => setFilterOption(e.target.value)}>
            <option value="">-- Select --</option>
            {productTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            className="small-button yellow-button"
            onClick={() => fetchProducts(searchTerm, sortOption, filterOption)}
          >
            Apply
          </button>
        </div>
        <LoginButton />
      </div>
      <ProductList products={products} />
    </div>
  );
};

export { MenuPage };
