import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const CreateProduct = () => {
  const [auth] = useAuth();

  // ======================
  // STATES
  // ======================
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);

  // ======================
  // GET ALL CATEGORIES
  // ======================
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );

      if (data?.success) {
        // ✅ SAFE FOR ALL RESPONSES
        setCategories(data.categories || data.category || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ======================
  // CREATE PRODUCT
  // ======================
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category); // ✅ CATEGORY _ID
      productData.append("quantity", quantity);
      productData.append("shipping", shipping); // ✅ BOOLEAN
      if (photo) productData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      alert(data?.message || "Product created");

      // RESET FORM
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setQuantity("");
      setShipping(false);
      setPhoto(null);
    } catch (error) {
      console.log(error);
      alert("Product creation failed");
    }
  };

  return (
    <Layout title="Create Product">
      <div className="container-fluid mt-3">
        <div className="row">
          {/* LEFT MENU */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-md-9">
            <h3>Create Product</h3>

            <form onSubmit={handleCreate}>
              {/* PHOTO UPLOAD */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              {/* PHOTO PREVIEW */}
              {photo && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product"
                    height="200"
                  />
                </div>
              )}

              {/* NAME */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* DESCRIPTION */}
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              {/* PRICE */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              {/* CATEGORY */}
              <div className="mb-3">
                <select
                  className="form-select"
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
              </div>

              {/* QUANTITY */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              {/* SHIPPING */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={shipping}
                  onChange={(e) =>
                    setShipping(e.target.value === "true")
                  }
                >
                  <option value="false">No Shipping</option>
                  <option value="true">Shipping Available</option>
                </select>
              </div>

              {/* SUBMIT */}
              <button className="btn btn-primary">
                CREATE PRODUCT
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
