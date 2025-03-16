import { useNavigate } from "react-router-dom";
import { useSearch } from "../../Context/search";
import axios from "axios";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="form-inline my-2 my-lg-0 d-flex "
        onSubmit={handleSubmit}
      >
        <input
          className="form-control "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button
          className="btn btn-outline-success bg-info border-info p-1 me-5"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
