import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data.categories);   // 🔥 FIXED
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `/api/v1/category/update-category/${editingId}`,
          { name },
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
      } else {
        await axios.post(
          "/api/v1/category/create-category",
          { name },
          {
            headers: { Authorization: `Bearer ${auth?.token}` },
          }
        );
      }
      setName("");
      setEditingId(null);
      getAllCategories();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await axios.delete(`/api/v1/category/delete-category/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      getAllCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Create Category">
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h3>{editingId ? "Edit Category" : "Create Category"}</h3>

            <form onSubmit={handleSubmit} className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button className="btn btn-primary mt-2">
                {editingId ? "Update" : "Create"}
              </button>
            </form>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(c)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(c._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
