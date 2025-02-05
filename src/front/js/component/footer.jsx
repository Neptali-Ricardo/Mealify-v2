import React from "react";
import { Separator } from "./separator.jsx";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="footer__content">
      {/* Logo del footer */}
      <div className="footer__logo" aria-label="Logo principal del sitio">
        <Link to="/" className="footer__link">
          <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888385/Mealify-logo-white_krffqk.svg" alt="Mealify logo" className="button__icon" />
        </Link>
      </div>

      {/* Contenido superior del footer */}
      <div className="footer__top">
        {/* Texto informativo del footer */}
        <section className="footer__text" aria-labelledby="footer-info">
          <p id="footer-info">
            Simplify your life and eat better every day. With Mealify, meal planning has never been easier. Discover personalized recipes, organize your shopping list, and embrace a healthier lifestyle effortlessly. Because your time and well-being matter.
          </p>
        </section>

        {/* Enlaces e íconos del footer */}
        <svg xmlns="http://www.w3.org/2000/svg" className="footer__icon-hidden">
          <symbol id="icon-arrow-right" viewBox="0 0 16 16">
            <path
              d="M9.89666 3.75521C9.76666 3.62521 9.55532 3.62521 9.42532 3.75521C9.29532 3.88521 9.29532 4.09655 9.42532 4.22655L12.8633 7.66455H2.33199C2.14799 7.66455 1.99866 7.81388 1.99866 7.99788C1.99866 8.18188 2.14799 8.33121 2.33199 8.33121H12.8633L9.42532 11.7692C9.29532 11.8992 9.29532 12.1105 9.42532 12.2405C9.49066 12.3059 9.57599 12.3379 9.66132 12.3379C9.74666 12.3379 9.83199 12.3052 9.89732 12.2405L13.9047 8.23322C13.9673 8.17055 14.002 8.08588 14.002 7.99722C14.002 7.90855 13.9667 7.82388 13.9047 7.76122L9.89732 3.75455L9.89666 3.75521Z"
              fill="white"
            />
          </symbol>
        </svg>

        <section className="footer__links">
          <nav className="footer__nav" aria-label="Enlaces de interés">
            <h5>About</h5>
            <ul className="footer__columns">
              <li className="footer__list-item">
                <Link to="/about" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">About</span>
                </Link>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Privacy Policy</span>
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Terms & Conditions</span>
                </a>
              </li>
            </ul>
          </nav>

          <nav className="footer__nav" aria-label="Enlaces de interés">
            <h5>GitHub & LinkedIn</h5>
            <ul className="footer__columns">
              <li className="footer__list-item">
                <a href="https://github.com/4GeeksAcademy/Final-Project-User-Stories-Wireframes-Mealify" className="footer__link" target="_blank" rel="noopener noreferrer">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">GitHub Repository</span>
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://www.linkedin.com/in/nepta/" className="footer__link" target="_blank" rel="noopener noreferrer">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Neptali Castejón LinkedIn</span>
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://www.linkedin.com/in/jose-antonio-llorens-padilla/" className="footer__link" target="_blank" rel="noopener noreferrer">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Jose Llorens LinkedIn</span>
                </a>
              </li>
            </ul>
          </nav>
          <nav className="footer__nav" aria-label="Enlaces de interés">
            <h5>Support</h5>
            <ul className="footer__columns">
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Feedback Form</span>
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">Social Media Links</span>
                </a>
              </li>
              <li className="footer__list-item">
                <a href="#" className="footer__link">
                  <img src="https://res.cloudinary.com/dfhhq651o/image/upload/v1737888384/arrow-right-button_oepqyy.svg" alt="arrow icon" className="button__icon" />
                  <span className="footer__link-text">FAQ</span>
                </a>
              </li>
            </ul>
          </nav>
        </section>
      </div>

      {/* Separador estilizado con icono */}
      <Separator />

      {/* Footer inferior */}
      <div className="footer__bottom">
        <div className="footer__bottom-left">
          <p>&copy; 2024 Mealify</p>
        </div>
      </div>
    </div>
  </footer>
);