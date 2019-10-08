import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";

import { openMenu } from "../../redux/actions";

const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMenu: () => {
      dispatch(openMenu());
    },
  };
};

const mapStateToProps = state => {
  return {
    showMenu: state.navigation.showMenu,
  };
};


class Navigation extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.showMenu) {
      document.body.classList.add("freeze")
    } else {
      document.body.classList.remove("freeze")
    }
  }

  render() {
    return (
      <header role="navigation">
        <div id="sticky-header" className="main-menu-area header-2-menu pl-55 pr-0">
          <div className="row">
              <div className="col-8 col-md-5 d-flex align-items-stretch">
                  <div className="header-logo text-left d-flex align-items-center">
                      <strong><a href="/">The Land and the Refinery</a></strong>
                  </div>
              </div>
              <div className="col-4 col-md-5 d-none d-md-block">
                  <div className="main-menu">
                      <nav id="mobile-menu">
                          <ul className="text-right">
                              <li className="">
                                  <a href="/about">about</a>
                              </li>
                              <li><a href="/news">news</a></li>
                              <li><a href="/get-involved">participate</a></li>
                              <li><a href="/contact">contact us</a></li>
                          </ul>
                      </nav>
                  </div>
              </div>
              <div className="col-4 col-md-2 d-flex justify-content-end align-items-center">
                  <div className="menu-button d-flex align-items-center px-3" onClick={this.props.openMenu} tabIndex="0">
                    <span className="mr-2">Menu</span>
                    <div className="menu-bar info-bar text-right">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
