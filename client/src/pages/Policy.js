import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
           <h4>Privacy Policy</h4>

  <p>
    We are committed to protecting your privacy and ensuring that your personal
    information is handled in a safe and responsible manner.
  </p>

  <p>
    We collect personal details such as your name, email address, phone number,
    and delivery address when you register or place an order on our website.
  </p>

  <p>
    Your information is used only to process orders, provide customer support,
    and improve our services. We do not sell, trade, or share your personal data
    with third parties.
  </p>

  <p>
    All payments are processed through secure and encrypted payment gateways to
    keep your financial information protected.
  </p>

  <p>
    We may use cookies to enhance your browsing experience and analyze website
    traffic to improve our platform.
  </p>

  <p>
    By using this website, you agree to the collection and use of information in
    accordance with this privacy policy.
  </p>

  <p>
    If you have any questions about this Privacy Policy, please feel free to
    contact us.
  </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
