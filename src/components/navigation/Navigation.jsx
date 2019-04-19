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
                    <div className="col-xl-8 col-lg-9 col-9">
                        <div className="main-menu">
                            <nav id="mobile-menu">
                                <ul>
                                    <li className="active">
                                        <Link to="/">The Land and the Refinery</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="mobile-menu"></div>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-3">
                        <div className="header2-right">
                            <div className={`menu-bar f-right info-bar text-right`} onClick={this.toggleMenu}>
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
                        <Link to={"/about"}><h4>About</h4></Link>
                        <Link to={"/news"}><h4>News</h4></Link>
                        <Link to={"/resources"}><h4>Resources</h4></Link>
                        <Link to={"/get-involved"}><h4>Get Involved</h4></Link>
                        <Link to={"/contact"}><h4>Contact Us</h4></Link>

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
