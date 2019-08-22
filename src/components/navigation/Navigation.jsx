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
      <header>
        <div id="sticky-header" className="main-menu-area header-2-menu pl-55 pr-55">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 d-flex align-items-stretch">
                        <div className="header-logo text-left d-flex align-items-center">
                            <a href="/">The Land and the Refinery</a>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-5">
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
                    <div className="col-xl-1 col-lg-1 d-flex justify-content-end">
                        <div className="menu-bar info-bar text-right d-none d-md-none d-lg-block" onClick={this.props.openMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
