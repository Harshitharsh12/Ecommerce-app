import React from "react";
import Layout from "../components/Layouts/Layout";
import { IoIosCall } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { FaHeadphones } from "react-icons/fa6";

const Contact = () => {
  return (
    <Layout title={"hfactor - contact us"}>
      <div className="contact">
        <div>
          <img
            src="/Images/BPO2.jpg"
            alt="Call-Center Pic"
            width={600}
            height={400}
          />
        </div>
        <div className="text">
          <h1 className="heading">Contact Us For Any Help</h1>
          <p className="p1">Available 24*7</p>
          <div className="p2">
            <p>For any query :</p>
            <p>
              <IoIosCall /> : 011-2345679
            </p>
            <p>
              <MdOutlineMail /> : hhg@gmail.com
            </p>
            <p>
              <FaHeadphones /> : 1800-00-0000(toll-free number)
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
