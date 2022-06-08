import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";

import CarouselSlider from "../components/CarouselSlider";

const Layout = (props) => {
  return (
    <div className="container">
      {props.loading && <Loader />}
      <Header />
      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
