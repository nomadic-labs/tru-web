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
        <div className="main-menu-area header-2-menu pl-55 pr-55">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 d-flex align-items-stretch">
                        <div className="header-logo text-left d-flex align-items-center">
                            <a href="/">The Land and the Refinery</a>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4">
                        <div className="main-menu">
                            <nav id="mobile-menu">
                                <ul className="text-right">
                                    <li className="">
                                        <a href="/about">about</a>
                                    </li>
                                    <li><a href="/news">news</a></li>
                                    <li><a href="/get-involved">get involved</a></li>
                                    <li><a href="/contact">contact us</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="mobile-menu"></div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    );
  }
}

export default Navigation;
