import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Fragment } from "react";
import { useEffect } from "react";
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle, FaWhatsapp } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS của AOS
function Intro() {
  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  useEffect(() => {
    // Khởi tạo AOS
    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (tính bằng milliseconds)
      easing: "ease-in-out", // Loại easing cho hiệu ứng
      once: true, // Chỉ chạy hiệu ứng một lần khi phần tử xuất hiện
    });
  }, []);

  return (
    <Fragment>
      <div className="intro">
        <h1 className="typing">WELCOME TO TECHNOLOGY WORLD !</h1>
        <div className="icon_gdcs"></div>
        <strong>
          Explore the world of technology with the latest innovations!
        </strong>
        <div style={{ width: "600px", margin: "0 auto" }}>
          <p className="fade-in-effect">
            In a world driven by innovation, technology shapes the way we live,
            work, and connect. From groundbreaking advancements in artificial
            intelligence to the ever-evolving digital landscape, the
            possibilities are limitless. As we embrace the future, we open doors
            to new opportunities, creative solutions, and a smarter tomorrow.
            Welcome to the world of technology—where ideas turn into reality,
            and the future is built today!
          </p>
        </div>
        <a className="glowButton" href="/home">
          Get Started
        </a>
      </div>
      <div className="content-child" data-aos="fade-up">
        <div className="svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f2726a" />
                <stop offset="100%" stop-color="#00f2ff" />
              </linearGradient>
            </defs>
            <g data-name="28-code" fill="url(#gradient)">
              <path d="M44 13h-2V9a1 1 0 0 0-1-1H19V6h22a3 3 0 0 1 3 3z" />
              <path d="M23 40H7a3 3 0 0 1-3-3V18h2v19a1 1 0 0 0 1 1h16z" />
              <path d="M15 39h2v4h-2z" />
              <path d="M13 47h-2v-2a3 3 0 0 1 3-3h9v2h-9a1 1 0 0 0-1 1z" />
              <path d="M9 46h16v2H9z" />
              <path d="M45 48H25a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v30a3 3 0 0 1-3 3zM25 14a1 1 0 0 0-1 1v30a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V15a1 1 0 0 0-1-1z" />
              <path d="M23 18h24v2H23z" />
              <path d="M23 40h24v2H23z" />
              <path d="M32 15h6v2h-6z" />
              <path d="M32 43h6v2h-6z" />
              <path d="M16 22a1 1 0 0 1-.707-.293l-2.2-2.2A10.039 10.039 0 1 1 17 17.127V21a1 1 0 0 1-.617.924A.987.987 0 0 1 16 22zm-2.65-4.65a1 1 0 0 1 .707.293l.943.943v-1.892a1 1 0 0 1 .332-.744 7.963 7.963 0 1 0-2.355 1.472.993.993 0 0 1 .373-.072z" />
              <path d="M5 12a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-2z" />
              <path d="M10 12a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-2z" />
              <path d="M15 12a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm0-2z" />
              <path d="M5 32h18v2H5z" />
              <path d="M13 30H9a1 1 0 0 1-1-1v-4h2v3h3z" />
              <path d="M15 28h2v2h-2z" />
              <path d="M30.293 33.707l-3-3a1 1 0 0 1 0-1.414l3-3 1.414 1.414L29.414 30l2.293 2.293z" />
              <path d="M39.707 33.707l-1.414-1.414L40.586 30l-2.293-2.293 1.414-1.414 3 3a1 1 0 0 1 0 1.414z" />
              <path d="M32.168 32.446l4-6 1.664 1.11-4 6z" />
              <path d="M26 22h2v2h-2z" />
              <path d="M30 22h2v2h-2z" />
              <path d="M42 36h2v2h-2z" />
              <path d="M38 36h2v2h-2z" />
            </g>
          </svg>
        </div>
        <div className="content1">
          <p>
            <span className="highlight">Welcome to [Your Website Name]</span> –
            Explore the Future of Technology!
          </p>
          <p>
            At <span className="highlight">[Your Website Name]</span>, we bring
            you the latest news, reviews, and trends in the world of technology.
            From artificial intelligence and blockchain to hardware,
            programming, and cybersecurity, we keep you updated with the most
            exciting innovations. 🚀
          </p>
          <ul>
            <li>
              <strong>Tech News</strong> – Stay informed about the latest
              breakthroughs from industry giants like Apple, Google, and
              Microsoft.
            </li>
            <li>
              <strong>Product Reviews</strong> – In-depth analysis of
              smartphones, laptops, and hardware components to help you make the
              best choices.
            </li>
            <li>
              <strong>Guides & Tutorials</strong> – A hub for developers, tech
              enthusiasts, and anyone looking to optimize their devices.
            </li>
            <li>
              <strong>Creative Community</strong> – Share ideas, experiences,
              and connect with fellow tech lovers worldwide.
            </li>
          </ul>
          <p>
            Join us today and stay ahead in the ever-evolving world of
            technology! 🚀
          </p>
        </div>
      </div>

      <div className="content-child" data-aos="fade-up">
        <div className="content1">
          <p>
            <span className="highlight">
              Discover the Future with [Your Website Name]!
            </span>{" "}
            – Explore the Future of Technology!
          </p>
          <p>
            Technology is evolving faster than ever, and at{" "}
            <span className="highlight">[Your Website Name]</span>, we help you
            stay ahead of the curve. Whether you're a tech enthusiast, a
            developer, or just someone who loves innovation, we provide
            everything you need to navigate the digital world.
          </p>
          <ul>
            <li>
              <strong>✨ Breaking Tech News</strong> – Stay informed with
              real-time updates on the latest industry trends.
            </li>
            <li>
              <strong>💻 Expert Reviews</strong> – Unbiased insights into the
              newest gadgets, software, and hardware.
            </li>
            <li>
              <strong>📚 Step-by-Step Tutorials</strong> – Learn coding,
              optimize your workflow, and explore emerging technologies.
            </li>
            <li>
              <strong>🌍 Engage with the Community</strong> – Exchange ideas,
              ask questions, and connect with fellow tech lovers.
            </li>
          </ul>
          <p>
            Join us on this journey into the world of technology – because the
            future is now! 🚀
          </p>
        </div>

        <div className="svg" style={{ marginLeft: "30px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#f2726a", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#00f2ff", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g fill="url(#grad2)">
              <path d="M43.879 34.228a4.123 4.123 0 0 0-4.048 3.395H35a3.155 3.155 0 0 1-3.151-3.152v-5.092h7.94a8.21 8.21 0 1 0-.689-16.391 9.16 9.16 0 0 0 .033-.771 9.593 9.593 0 0 0-16.389-6.785A7.964 7.964 0 0 0 7.229 7.973c0 .158 0 .32.016.482A6.829 6.829 0 1 0 6.831 22.1h.916a6.642 6.642 0 0 0-.059.734 6.549 6.549 0 0 0 6.542 6.543h1.921v5.093A3.155 3.155 0 0 1 13 37.622H8.169a4.12 4.12 0 1 0 0 1.454H13a4.611 4.611 0 0 0 4.606-4.607V20.283a.728.728 0 1 0-1.455 0v7.641H14.23a5.084 5.084 0 0 1-.964-10.076.727.727 0 0 0 .5-1.072 4.2 4.2 0 0 1 6.474-5.171.728.728 0 0 0 1.21-.445 8.15 8.15 0 1 1 16.091 2.556.722.722 0 0 0 .207.652.713.713 0 0 0 .659.191 6.755 6.755 0 1 1 1.388 13.365h-7.94v-7.641a.728.728 0 1 0-1.455 0v14.186a4.611 4.611 0 0 0 4.6 4.607h4.831a4.117 4.117 0 1 0 4.046-4.848zM4.121 41.017a2.667 2.667 0 1 1 2.667-2.668 2.67 2.67 0 0 1-2.667 2.668zM20.227 9.808a5.65 5.65 0 0 0-8.12 6.847 6.549 6.549 0 0 0-4.028 3.99H6.831a5.375 5.375 0 1 1 0-10.75 5.212 5.212 0 0 1 1.1.119.743.743 0 0 0 .659-.191.729.729 0 0 0 .21-.654 6.444 6.444 0 0 1-.116-1.2A6.51 6.51 0 0 1 21.6 6.8a9.547 9.547 0 0 0-1.373 3.008zm23.652 31.209a2.667 2.667 0 1 1 2.667-2.668 2.67 2.67 0 0 1-2.667 2.668z" />
              <path d="M24.727 39.151V20.284a.727.727 0 1 0-1.454 0v18.867a4.121 4.121 0 1 0 1.454 0zM24 45.864a2.666 2.666 0 1 1 2.667-2.664A2.669 2.669 0 0 1 24 45.864z" />
            </g>
          </svg>
        </div>
      </div>

      <div className="content-child" data-aos="fade-up">
        <div className="content1">
          <p>
            <span className="highlight">
              Stay Ahead in the Digital Revolution with [Your Website Name]!
            </span>
          </p>
          <p>
            In a world driven by innovation, staying updated is more important
            than ever. At <span className="highlight">[Your Website Name]</span>
            , we bring you the latest insights, expert reviews, and practical
            guides to help you navigate the fast-paced world of technology.
          </p>
          <ul>
            <li>
              🚀 <strong>Latest Innovations</strong> – Explore groundbreaking
              advancements in AI, cybersecurity, blockchain, and more.
            </li>
            <li>
              🔍 <strong>Unbiased Tech Reviews</strong> – Get honest evaluations
              of gadgets, software, and hardware before making a purchase.
            </li>
            <li>
              💡 <strong>Hands-on Tutorials</strong> – Master new technologies
              with easy-to-follow guides and step-by-step instructions.
            </li>
            <li>
              🤝 <strong>Join the Conversation</strong> – Connect with tech
              enthusiasts, share knowledge, and be part of a thriving community.
            </li>
          </ul>
          <p>Don’t just keep up—lead the way in the future of technology! 🚀</p>
        </div>

        <div className="svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#f2726a", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#00f2ff", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <g fill="url(#grad2)">
              <path d="M84.723 41.527H43.276a1.75 1.75 0 0 0-1.75 1.75v41.446a1.75 1.75 0 0 0 1.75 1.75h41.447a1.75 1.75 0 0 0 1.75-1.75V43.277a1.75 1.75 0 0 0-1.75-1.75zm-1.75 41.446H45.026V45.027h37.947z" />
              <path d="M115.208 57.586a1.75 1.75 0 0 0 0-3.5H96.521v-7.427h8.469a1.75 1.75 0 0 0 1.75-1.75v-8.3h8.468a1.75 1.75 0 0 0 0-3.5H104.99a1.749 1.749 0 0 0-1.75 1.75v8.3h-6.719v-9.93a1.751 1.751 0 0 0-1.75-1.75h-9.93V24.76h8.3a1.75 1.75 0 0 0 1.75-1.75V12.792a1.75 1.75 0 0 0-3.5 0v8.468h-8.3a1.75 1.75 0 0 0-1.75 1.75v8.469h-7.427V12.792a1.75 1.75 0 0 0-3.5 0v18.687H57.586V12.792a1.75 1.75 0 0 0-3.5 0v18.687h-7.427V23.01a1.751 1.751 0 0 0-1.75-1.75h-8.3v-8.468a1.75 1.75 0 0 0-3.5 0V23.01a1.749 1.749 0 0 0 1.75 1.75h8.3v6.719h-9.93a1.751 1.751 0 0 0-1.75 1.75v9.93H24.76v-8.3a1.749 1.749 0 0 0-1.75-1.75H12.791a1.75 1.75 0 0 0 0 3.5h8.469v8.3a1.75 1.75 0 0 0 1.75 1.75h8.469v7.427H12.791a1.75 1.75 0 1 0 0 3.5h18.688v12.828H12.791a1.75 1.75 0 1 0 0 3.5h18.688v7.427H23.01a1.75 1.75 0 0 0-1.75 1.75v8.3h-8.469a1.75 1.75 0 1 0 0 3.5H23.01a1.749 1.749 0 0 0 1.75-1.75v-8.3h6.719v9.93a1.751 1.751 0 0 0 1.75 1.75h9.93v6.719h-8.3a1.749 1.749 0 0 0-1.75 1.75v10.218a1.75 1.75 0 0 0 3.5 0v-8.468h8.3a1.751 1.751 0 0 0 1.75-1.75v-8.469h7.427v18.687a1.75 1.75 0 0 0 3.5 0V96.521h12.828v18.687a1.75 1.75 0 0 0 3.5 0V96.521h7.427v8.469a1.75 1.75 0 0 0 1.75 1.75h8.3v8.468a1.75 1.75 0 0 0 3.5 0V104.99a1.75 1.75 0 0 0-1.75-1.75h-8.3v-6.719h9.93a1.751 1.751 0 0 0 1.75-1.75v-9.93h6.719v8.3a1.749 1.749 0 0 0 1.75 1.75h10.218a1.75 1.75 0 0 0 0-3.5h-8.468v-8.3a1.75 1.75 0 0 0-1.75-1.75h-8.469v-7.427h18.687a1.75 1.75 0 0 0 0-3.5H96.521V57.586zM93.021 93.021H34.979V34.979h58.042z" />
            </g>
          </svg>
        </div>
      </div>
      <div className="menu-choice" data-aos="fade-up">
        <div className="menu-choice-head">
          Custom Software Development Services
        </div>
        <div className="menu-choice-content">
          <div className="menu-choice-content-child">
            <div className="name-choice">Web Development</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="fluter"></div>
              <div className="nodejs"></div>
              <div className="reactjs"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">IT Consulting</div>
            <div className="demo-choice">
              If you are looking for a trustworthy and reputable
            </div>
            <div className="icon-choice">
              <div className="vscode"></div>
              <div className="intellj"></div>
              <div className="webstorm"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">UI/UX Design</div>
            <div className="demo-choice">
              Support and streamline your operations with softwa
            </div>
            <div className="icon-choice">
              <div className="figma"></div>
              <div className="adopexd"></div>
              <div className="elixir"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">App Development</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="fluter"></div>
              <div className="java"></div>
              <div className="eclipse"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">Software Testing</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="jest"></div>
              <div className="pytest"></div>
              <div className="selenium"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">Dedicated Team</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="trello"></div>
              <div className="slack"></div>
              <div className="prometheus"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">DevOps & QA</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="github"></div>
              <div className="docker"></div>
              <div className="Ansible"></div>
            </div>
          </div>
          <div className="menu-choice-content-child">
            <div className="name-choice">Data Security</div>
            <div className="demo-choice">
              Support and streamline your operations with software
            </div>
            <div className="icon-choice">
              <div className="mysql"></div>
              <div className="mongodb"></div>
              <div className="database"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-intro">
        <div className="infor">
          <strong>Information</strong>
          <ul>
            <li>Formats</li>
            <li>Compression</li>
            <li>Pricing</li>
            <li>FAQ</li>
            <li>About</li>
            <li>Status</li>
            <li>Policy</li>
          </ul>
        </div>
        <div className="get-started">
          <strong>Get Started</strong>
          <ul>
            <li>Introducing</li>
            <li>Themes</li>
            <li>Templates</li>
            <li>Documentation</li>
            <li>Support</li>
            <li>Usages</li>
            <li>Elements</li>
            <li>Global</li>
          </ul>
        </div>
        <div className="resource">
          <strong>Resources</strong>
          <ul>
            <li>API</li>
            <li>Form Validation</li>
            <li>Form Validation</li>
            <li>Accessibility</li>
            <li>Marketplace</li>
            <li>Visibility</li>
            <li>Commuity</li>
          </ul>
        </div>
        <div className="newsletter">
          <strong>Newsletter</strong>
          <p>Subscribe to our newsletter for a weekly </p>
          <p>dose of news, updates,helpful tips, and</p>
          <p>exclusive offers.</p>
          <form action="#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>


          <div className="wrapperq">
            <ul>
              <li className="facebook">
                <a href="#">
                  <i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
                </a>
              </li>
              <li className="twitter">
                <a href="#">
                  <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
                </a>
              </li>
              <li className="instagram">
                <a href="#">
                  <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                </a>
              </li>
              <li className="google">
                <a href="#">
                  <i className="fa fa-google fa-2x" aria-hidden="true"></i>
                </a>
              </li>
              <li className="whatsapp">
                <a href="#">
                  <i className="fa fa-whatsapp fa-2x" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default Intro;
