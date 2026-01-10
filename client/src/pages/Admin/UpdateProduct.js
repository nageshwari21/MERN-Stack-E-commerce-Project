import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);

  /* ================= LOAD PRODUCT ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const prodRes = await axios.get(
          `/api/v1/product/single-product/${id}`
        );
        const p = prodRes.data.product;

        setName(p.name);
        setDescription(p.description);
        setPrice(p.price);
        setQuantity(p.quantity);
        setShipping(p.shipping);

        const selectedCat =
          typeof p.category === "object" ? p.category._id : p.category;

        const catRes = await axios.get("/api/v1/category/get-category");
        setCategories(catRes.data.categories);
        setCategory(selectedCat.toString());
      } catch (err) {
        toast.error("Failed to load product");
      }
    };

    loadData();
  }, [id]);

  /* ================= UPDATE PRODUCT ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("description", description);
      form.append("price", price);
      form.append("category", category);
      form.append("quantity", quantity);
      form.append("shipping", shipping);
      if (photo) form.append("photo", photo);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Product Updated");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update error");
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const handleDelete = async () => {
    try {
      const answer = window.prompt("Type YES to delete this product");
      if (answer !== "YES") return;

      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.success) {
        toast.success("Product Deleted");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <Layout title="Update Product">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h3 className="mb-3">Update Product</h3>

            <form onSubmit={handleUpdate}>
              <input
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />

              <textarea
                className="form-control mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

              <input
                className="form-control mb-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

              <select
                className="form-control mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                className="form-control mb-2"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />

              <p className="mt-2">Current Image:</p>
              <img
                src={`/api/v1/product/product-photo/${id}`}
                alt="product"
                height="120"
                className="mb-3"
              />

              <input
                type="file"
                className="form-control mb-3"
                onChange={(e) => setPhoto(e.target.files[0])}
              />

              <button className="btn btn-primary me-2">
                Update Product
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
