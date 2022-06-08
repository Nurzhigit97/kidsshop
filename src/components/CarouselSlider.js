import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselSlider = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={"null"}>
          <img
            className="d-block w-50 h-50"
            src="http://www.wenstourism.com/wp-content/uploads/2018/01/img-world-of-adventure-9.jpgs"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://www.wenstourism.com/wp-content/uploads/2018/01/img-world-of-adventure-9.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://www.wenstourism.com/wp-content/uploads/2018/01/img-world-of-adventure-9.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
