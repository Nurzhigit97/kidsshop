import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../firebaseConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminPage = () => {
  // const userId = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    category: "",
    price: 0,
    description: "",
    rate: 0,
    count: 0,
  });
  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);
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
    getOrdersData();
  }, []);
  async function getOrdersData() {
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

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };
  //!for update Data from db firebase
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      handleClose(); //! close after updated
      toast.success("Product upadted successfully");
      window.location.reload();
    } catch (error) {
      console.log("error");
      toast.success("Product upadted failed");
      setLoading(false);
    }
  };

  const addHundler = () => {
    setAdd(true);
    handleShow();
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose(); //! close after updated
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      console.log("error");
      toast.success("Product add failed");
      setLoading(false);
    }
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      getData(); //!for update live
    } catch (error) {
      toast.success("Product delete failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <button onClick={addHundler}>Add Product</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
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
                    <td>{item.category}</td>
                    <td>{item.price} $</td>
                    <td>{item.description}</td>
                    <td>{item.rate}</td>
                    <td>{item.count}</td>
                    <td className="d-flex justify-content-between">
                      <FaTrash
                        className="del text-danger"
                        onClick={() => deleteProduct(item)}
                        size={25}
                      />

                      <FaEdit
                        onClick={() => editHandler(item)}
                        className="text-primary"
                        size={25}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add ? `Add a product` : `Edit Product`}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="register-form">
                <h2>Register</h2>
                <hr />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image url..."
                  value={product.image}
                  onChange={(e) => {
                    setProduct({ ...product, image: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name..."
                  value={product.title}
                  onChange={(e) => {
                    setProduct({ ...product, title: e.target.value });
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category..."
                  value={product.category}
                  onChange={(e) => {
                    setProduct({ ...product, category: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price..."
                  value={product.price}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control"
                  placeholder="description..."
                  value={product.description}
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Rate..."
                  value={product.rate}
                  onChange={(e) => {
                    setProduct({ ...product, rate: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Count..."
                  value={product.count}
                  onChange={(e) => {
                    setProduct({ ...product, count: e.target.value });
                  }}
                />
                <hr />
                <Link to="/login"> Click herer to Login</Link>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
              {add ? (
                <Button onClick={addProduct}>Save</Button>
              ) : (
                <Button onClick={updateProduct}>Save</Button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
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
        </Tab>
        <Tab eventKey="users" title="Users">
          <h1>Users</h1>
        </Tab>
      </Tabs>
    </Layout>
  );
};

export default AdminPage;
