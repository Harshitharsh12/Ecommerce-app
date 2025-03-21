import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layouts/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container ">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3  " key={c._id}>
              <Link to={`/category/${c.slug}`} className="btn cat-btn ">
                <h1>{c.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
