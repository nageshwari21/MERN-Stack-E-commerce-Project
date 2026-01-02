import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams(); // product _id
  const navigate = useNavigate();
  const [auth] = useAuth();

  // ================= STATES =================
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [productId, setProductId] = useState("");

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/v1/product/single-product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
          }
        );

        const product = data.product;

        setProductId(product._id);
        setName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || "");
        setQuantity(product.quantity || "");
        setShipping(product.shipping === true || product.shipping === 1);
        setCategory(
          typeof product.category === "object"
            ? product.category._id
            : product.category
        );

        const catRes = await axios.get(
          "/api/v1/category/get-category",
          { headers: { "Cache-Control": "no-cache" } }
        );

        setCategories(catRes.data.categories || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product");
      }
    };

    if (id && auth?.token) fetchData();
  }, [id, auth?.token]);

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data", // 🔥 REQUIRED
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update error");
    }
  };

  // ================= DELETE PRODUCT =================
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      await axios.delete(
        `/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      toast.success("Product Deleted");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  // ================= UI =================
  return (
    <Layout title="Update Product">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h3>Update Product</h3>

            <form onSubmit={handleUpdate}>
              <input
                type="text"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />

              <textarea
                className="form-control mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />

              <input
                type="number"
                className="form-control mb-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />

              <select
                className="form-control mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="form-control mb-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                required
              />

              <div className="mb-2">
                <label>
                  <input
                    type="checkbox"
                    checked={shipping}
                    onChange={() => setShipping(!shipping)}
                  />{" "}
                  Shipping Available
                </label>
              </div>

              {productId && (
                <div className="mb-2">
                  <p>Current Image:</p>
                  <img
                    src={`/api/v1/product/product-photo/${productId}`}
                    alt="product"
                    height="120"
                  />
                </div>
              )}

              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setPhoto(e.target.files[0])}
              />

              <div className="d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                  Update Product
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete Product
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
