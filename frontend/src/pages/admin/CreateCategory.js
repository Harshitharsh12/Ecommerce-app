import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CreateCategoryForm from "../../components/Form/CreatCategoryForm";
import Modal from "../../components/Modals/Modal";
// import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/category/create-category", {
        // const {data} = await axios.post("/api/v1/category/create-category", {
        name,
      });
      // if (res.data != undefined) {
      if (res.data.success) {
        // toast.success(`${res.data.category.name} is created!!`);
        toast.success(`${name} Category is created!!`);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Input Form!!");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (res.data.success) {
        toast.success(`${updateName} is Updated!!`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/category/delete-category/${id}`);
      if (res.data.success) {
        toast.success(`${name} is deleted!!`);
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!!");
    }
  };
  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data.success) {
        setCategories(res.data.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!!");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3">
              {visible === true ? (
                <Modal
                  handleSubmit={handleUpdate}
                  name={updateName}
                  setName={setUpdateName}
                  setVisible={setVisible}
                  header={"Update Category"}
                  footer={"Update"}
                ></Modal>
              ) : (
                ""
              )}
              <CreateCategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        {/* <td>{c.name}</td> */}

                        <td>
                          <button
                            onClick={() => {
                              setVisible(true);
                              setSelected(c);
                              setUpdateName(c.name);
                            }}
                            className=" edit btn btn-primary "
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(c._id);
                              setName(c.name);
                            }}
                            type="button"
                            className=" delete btn btn-danger ms-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CreateCategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
