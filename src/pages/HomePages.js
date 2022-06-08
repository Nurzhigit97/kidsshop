import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../firebaseConfig";
import { useNavigate } from "react-router-dom"; //!for get key in productInfo
import { useDispatch, useSelector } from "react-redux";
/* import { addDoc } from "firebase/firestore";
import { fireProducts } from "../kidsshop-products"; //! for add data to firebase */
function HomePages() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc, key) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  /*   function addDataProductstoFireBase() {
    fireProducts.map(async (product) => {
      try {
        await addDoc(collection(fireDB, "products"), product);
      } catch (error) {
        console.log(error);
      }
    });
  } */
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50 align-items-baseline">
          <input
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Search items"
          />
          <select
            name=""
            id=""
            className="form-control"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="men's clothing">Men's clothings</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.title.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="col">
                  <div className="m-2 p-2 product position-relative">
                    <div className="product-content">
                      <p className="text-center">
                        {product.title.length > 30
                          ? product.title.slice(0, 32)
                          : product.title}
                      </p>
                      <div className="text-center">
                        <img
                          src={product.image}
                          alt="kidsshop"
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="price">
                      <span>price: {Number.parseInt(product.price)}$</span>
                      <span>{product.rate}</span>
                    </div>
                    <div className="product-actions">
                      <div className="d-flex">
                        <button
                          className="mx-2"
                          onClick={() => addToCart(product)}
                        >
                          Add to cart
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productInfo/${product.id}`); //! firebase himself generates the keys
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/*    <button onClick={addDataProductstoFireBase}></button>//for get data from firebase */}
      </div>
    </Layout>
  );
}

export default HomePages;
