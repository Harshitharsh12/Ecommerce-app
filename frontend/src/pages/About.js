import React from "react";
import Layout from "../components/Layouts/Layout";

const About = () => {
  return (
    <Layout title={"hfactor - about us"}>
      <div className="about">
        <div>
          <img
            src="/Images/about.jpeg"
            alt="Call-Center Pic"
            width={650}
            height={400}
          />
        </div>
        <div className="text2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          eveniet voluptatum ex iste pariatur vero enim minima quaerat amet nemo
          asperiores maiores corrupti natus placeat voluptas, laudantium
          provident dignissimos sed reprehenderit, in dicta esse qui hic autem.
          Ex repudiandae nemo ducimus dicta provident! Itaque nesciunt
          explicabo, repudiandae minus molestiae laboriosam doloremque amet
          facilis adipisci saepe dolore autem tempore. Sequi, eligendi aliquid?
          Dolores sit pariatur voluptatum dolorum, sed tenetur, obcaecati ex.
        </div>
      </div>
    </Layout>
  );
};

export default About;
