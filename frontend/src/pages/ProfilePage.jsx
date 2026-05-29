import { Link, useNavigate } from "react-router";
import { useMyProducts, useDeleteProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import { PlusIcon, PackageIcon, EyeIcon, EditIcon, Trash2Icon } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-base-content/60 text-sm">Manage your listings</p>
        </div>
        <Link to="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-4" /> New
        </Link>
      </div>

      {/* Stats */}
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">{products?.length || 0}</div>
        </div>
      </div>

      {/* Products */}
      {products?.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">Start by creating your first product</p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <img src={product.imageUrl} alt={product.title} className="h-full object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-1">{product.description}</p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EyeIcon className="size-3" /> View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EditIcon className="size-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-ghost btn-xs text-error gap-1"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;