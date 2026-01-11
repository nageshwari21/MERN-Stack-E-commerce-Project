import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to our online store — a modern shopping platform designed to make your life easier.

We provide a wide range of quality products at affordable prices, carefully selected to meet the needs of our customers. Our focus is on delivering reliable products, secure payments, and fast service so you can shop with confidence.

We believe online shopping should be simple, safe, and enjoyable. That’s why we continuously improve our platform to offer a smooth and user-friendly experience.

Customer satisfaction is our top priority, and we are committed to providing excellent service at every step of your shopping journey.

Thank you for choosing us as your trusted shopping partner.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
