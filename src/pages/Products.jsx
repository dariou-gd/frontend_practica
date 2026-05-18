import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const navigate = useNavigate();

  const { token, loadingAuth } = useAuth();

  const { products, loading, error, addProduct, deleteProduct, updateProduct } =
    useProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const itemsPerPage = 5;

  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (loadingAuth) return;

    if (!token) {
      navigate("/");
    }
  }, [navigate, loadingAuth, token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const resetForm = () => {
    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
    });

    setEditingProduct(null);

    setShowModal(false);
  };

  const handleSaveProduct = () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.category
    ) {
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct, newProduct);
    } else {
      addProduct(newProduct);
    }

    resetForm();
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);

    setNewProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    });

    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Productos</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Nuevo Producto
            </button>

            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">Total productos</p>

              <p className="mt-1 text-xl font-semibold text-slate-900">
                {products.length}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
          <div className="border-b border-slate-200 bg-slate-100 px-6 py-4">
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
                        <td className="max-w-xl break-words px-6 py-4 align-top text-sm text-slate-700">
                          {product.title}
                        </td>

                        <td className="px-6 py-4 align-top text-sm font-semibold text-slate-900">
                          ${product.price.toFixed(2)}
                        </td>

                        <td className="max-w-2xl break-words px-6 py-4 align-top text-sm text-slate-600">
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
                              onClick={() => handleEditClick(product)}
                              className="rounded-full bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="rounded-full bg-red-500 px-3 py-1 text-white transition hover:bg-red-600"
                            >
                              Eliminar
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

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
              <h2 className="mb-6 text-2xl font-semibold text-slate-900">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Título"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />

                <textarea
                  name="description"
                  placeholder="Descripción"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />

                <input
                  type="text"
                  name="category"
                  placeholder="Categoría"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="rounded-2xl bg-slate-200 px-5 py-3 text-slate-700"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSaveProduct}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-white"
                >
                  {editingProduct ? "Actualizar" : "Agregar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
