import React, { useEffect, useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginButton, CartButton } from "../components/NavigationButtons";
import { ProductList } from "../components/ProductList";
import { Product } from "../components/ProductItem";
import { ChoosePlaceModal } from "../components/ChoosePlaceModal";
import { OrderContext, PlaceType } from "../context/OrderContext";
import "../styles/App.css";
import "../styles/main_page.css";

const MenuPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState([]);
  const { chosenPlace, setPlace } = useContext(OrderContext)!;
  const [modalVisible, setModalVisible] = useState(!chosenPlace);
  const navigate = useNavigate();

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

  const fetchProductTypes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/types");
      const data = await response.json();
      setProductTypes(data.types || []);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  }, []);

  useEffect(() => {
    fetchProductTypes();
  }, [fetchProductTypes]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSave = (place: PlaceType) => {
    setPlace(place);
    setModalVisible(false);
  };

  const handlePlaceModalClose = () => {
    setModalVisible(false);
    navigate("/");
  };

  return (
    <div className="main-page">
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
        <CartButton />
        <LoginButton />
      </div>
      <ProductList products={products} />
      <ChoosePlaceModal
        visible={modalVisible}
        onSave={handleSave}
        onClose={handlePlaceModalClose}
      />
    </div>
  );
};

export { MenuPage };
