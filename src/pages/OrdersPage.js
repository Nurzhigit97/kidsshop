import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fireDB from "../firebaseConfig";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);

      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    console.log(orders);
  }
  return (
    <Layout loading={loading}>
      <div className="p">
        {orders
          .filter((obj) => obj.userId === userId)
          .map((order) => {
            return (
              <table className="table mt-3 order">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.image}
                            alt={item.category}
                            height="80"
                            width="80"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.price} $</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
      </div>
    </Layout>
  );
};

export default OrdersPage;
