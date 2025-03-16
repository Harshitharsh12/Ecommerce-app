import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-singleProduct/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setPhoto(data.product.photo);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data?.success) {
        setCategories(res.data?.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!!");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  const handleUpdate = async (e) => {
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const res = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res?.data?.message);
      }
      toast.success(id);
    } catch (error) {
      // console.log(error);
      toast.error("Something Went Wrong in Updating Product!!");
    }
  };
  const handleDelete = async (e) => {
    try {
      const answer = window.prompt("Do you want to Delete Product ??");
      if (!answer) {
        return;
      }
      const res = await axios.delete(`/api/v1/product/delete-product/${id}`);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Deleting Product!!");
    }
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h1>Update Product</h1>
            <div className="m-1">
              <Select
                variant={false}
                placeholder="Select A Category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label
                  className="bg-secondary text-white btn-outline-primary 
                    col-md-12 rounded-2 text-center p-2 border border-white "
                >
                  {photo ? { photo } : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/get-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write Product Name"
                  className="form-control bg-white"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Write Description of Product"
                  className="form-control bg-white"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Price"
                  className="form-control bg-white"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control bg-white"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 bg-secondary">
                <Select
                  className="w-100 rounded-2 "
                  placeholder="Select Shipping"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={handleUpdate}
                  className=" btn btn-primary w-25 product"
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  onClick={handleDelete}
                  className=" btn btn-danger delete w-25 product"
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
