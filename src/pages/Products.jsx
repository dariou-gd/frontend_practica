import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Nav from "../components/Nav";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProducts = async () => {
      try {
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

    fetchProducts();
  }, [navigate, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {token && <Nav />}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Productos</h1>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total productos</p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {products.length}
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-100">
            <h2 className="text-lg font-medium text-slate-900">Catálogo</h2>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-500">
                Cargando productos...
              </div>
            ) : error ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-6 text-rose-700">
                {error}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Título
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Precio
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {currentProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 align-top text-sm text-slate-700 max-w-xl break-words">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 align-top text-sm font-semibold text-slate-900">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-slate-600 max-w-2xl break-words">
                          {product.description}
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-slate-700">
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 align-top text-sm text-slate-700">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="rounded-full w-full bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                            >
                              Ver
                            </button>
                            <button
                              type="button"
                              className="rounded-full w-full bg-slate-200 px-3 py-1 text-slate-700 transition hover:bg-slate-300"
                            >
                              Comprar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 flex flex-col gap-3 rounded-3xl bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-600">
                    Página {currentPage} de {totalPages}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Anterior
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
                            currentPage === page
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "bg-white text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;
