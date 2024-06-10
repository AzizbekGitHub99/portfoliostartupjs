import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

import "./style.scss";

const HomePage = () => {
  return (
    <section className="home">
      <div className="home__container container">
      <Typewriter
          options={{
            strings: ["Create the portfolio of your dreams !!!"],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 800000,
            cursorVisible: true,
          }}
        />
        <p className="home__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          quaerat ullam, inventore nostrum praesentium, numquam molestiae
          eveniet dolorem fuga ex porro voluptate magnam vitae aspernatur.
          Quibusdam sequi aut nihil? Sint dolores deserunt voluptates eaque,
          assumenda vero exercitationem ut qui distinctio iure ratione nemo,
          cumque eveniet placeat! Molestias itaque similique impedit!
        </p>
        <Link className="home__login" to="/login">Login  </Link>
      </div>
    </section>
  );
};

export default HomePage;
