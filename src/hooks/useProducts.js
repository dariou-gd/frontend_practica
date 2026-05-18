import { useEffect, useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://fakestoreapi.com/products");

      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }

      const data = await response.json();

      setProducts(data);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (newProduct) => {
    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      price: Number(newProduct.price),
    };

    setProducts((prevProducts) => [productToAdd, ...prevProducts]);
  };

  const deleteProduct = (id) => {
    const filteredProducts = products.filter((product) => product.id !== id);

    setProducts(filteredProducts);
  };

  const updateProduct = (editingProduct, updatedData) => {
    const updatedProducts = products.map((product) => {
      if (product.id === editingProduct.id) {
        return {
          ...product,
          ...updatedData,
          price: Number(updatedData.price),
        };
      }

      return product;
    });

    setProducts(updatedProducts);
  };

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    updateProduct,
  };
};
