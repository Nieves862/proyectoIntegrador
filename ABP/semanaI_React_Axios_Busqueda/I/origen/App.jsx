import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ProductCard from "./components/ProductCard"; // Importamos el componente

function App() {
  // 1. Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar carga

  // 2. useEffect para hacer la petición al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setLoading(false); // Quitamos el estado de carga (éxito o error)
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo una vez al inicio

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Título principal */}
      <h1 className="text-3xl text-blue-600 font-bold text-center mb-8">
        Vite + React + DummyJSON API
      </h1>

      {/* Mensaje de carga (si loading es true) */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </div>
      ) : (
        // Lista de productos (si hay datos)
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Productos disponibles:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Texto adicional */}
      <p className="text-center text-gray-400 mt-10 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;