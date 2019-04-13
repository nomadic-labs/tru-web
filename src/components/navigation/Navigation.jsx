import React from "react";
import { Link } from "gatsby";

const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}


class Navigation extends React.Component {
  state = { menuOpen: false }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    return (
      <header>
        <div id="sticky-header" className="main-menu-area header-2-menu pl-55 pr-55">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-2 col-lg-2 d-flex align-items-center">
                        <div className="logo">
                            <a href="index.html"><img src="img/logo/logo.png" alt="" /></a>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                        <div className="main-menu">
                            <nav id="mobile-menu">
                                <ul>
                                    <li className="active"><a href="index.html">home</a>
                                        <ul className="sub-menu text-left">
                                            <li><a href="index.html">home 1</a></li>
                                            <li><a href="index-2.html">home 2</a></li>
                                            <li><a href="index-3.html">home 3</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="about.html">about</a></li>
                                    <li><a href="services.html">Services</a></li>
                                    <li><a href="shop.html">shop</a></li>
                                    <li><a href="blog.html">blog</a></li>
                                    <li><a href="#">pages</a>
                                        <ul className="sub-menu text-left">
                                            <li><a href="gallery.html">gallery 01</a></li>
                                            <li><a href="gallery-no-gutter.html">gallery 02</a></li>
                                            <li><a href="gallery-2-col.html">gallery 03</a></li>
                                            <li><a href="gallery-2-col-no-gutter.html">gallery 04</a></li>
                                            <li><a href="gallery-details.html">Gallery Details</a></li>
                                            <li><a href="faq.html">faq</a></li>
                                            <li><a href="team.html">team</a></li>
                                            <li><a href="blog-details.html">Blog Details</a></li>
                                            <li><a href="product-details.html">Product Details</a></li>
                                            <li><a href="services-details.html">Services Details</a></li>
                                            <li><a href="404.html">404 Page</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="contact.html">contact</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="mobile-menu"></div>
                    </div>
                    <div className="col-xl-4 col-lg-3">
                        <div className="header2-right d-none d-md-none d-lg-block">
                            <div className={`menu-bar f-right info-bar text-right d-none d-md-none d-lg-block`} onClick={this.toggleMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`extra-info ${this.state.menuOpen ? 'info-open' : ''}`}>
            <div className="close-icon">
                <button onClick={this.toggleMenu}>
                    <i className="far fa-window-close"></i>
                </button>
            </div>

            <div className="logo-side mb-30">
                <a href="index.html">
                    <img src="img/logo/logo-white.png" alt="" />
                </a>
            </div>

            <div className="side-info mb-30">
                <div className="row">
                    <div className="col-md-3">
                        <Link to={"/"}><h4>Home</h4></Link>
                        <Link to={"/"}><h4>About</h4></Link>
                        <Link to={"/"}><h4>News</h4></Link>
                        <Link to={"/"}><h4>Resources</h4></Link>
                        <Link to={"/"}><h4>Get Involved</h4></Link>
                        <Link to={"/"}><h4>Contact Us</h4></Link>

                        <div className="social-icon-right mt-20">
                            <a href="#">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <Link to={"/"}><h4>Research Topics</h4></Link>
                        <Link to={"/"}><h4>Timeline</h4></Link>
                        <Link to={"/"}><h4>Data Visualization</h4></Link>
                        <Link to={"/"}><h4>Chemical Responsibilities App</h4></Link>
                    </div>

                    <div className="col-md-6">
                        <h4>Explore the Research</h4>
                    </div>
                </div>

            </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
