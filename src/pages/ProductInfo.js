import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const ProductInfo = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const producTemp = await getDoc(
        doc(fireDB, "products", params.productId)
      );
      setProduct(producTemp.data()); //! get data product
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.title}</b>
                </p>
                <img
                  src={product.image}
                  alt={product.category}
                  className="product-info-img w-25"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button className="mx-2" onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;
