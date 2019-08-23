import React from "react";
import { Link } from "gatsby";
import { connect } from "react-redux";

import { EditableImageUpload } from "react-easy-editables";

import Explore from "../common/Explore";
import Affix from "../common/Affix";
import TopicSelector from "../common/TopicSelector";
import dylan3 from "../../assets/images/illustrations/Dylan_Minor3.png";

import { closeMenu } from "../../redux/actions";


const mapDispatchToProps = dispatch => {
  return {
    closeMenu: () => {
      dispatch(closeMenu());
    }
  };
};

const mapStateToProps = state => {
  return {
    showMenu: state.navigation.showMenu,
  };
};

const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}


const FullPageNavigation = ({ showMenu, closeMenu }) => {
    return (
      <aside>
        <div id="full-page-menu" className={`${showMenu ? 'info-open' : ''}`}>
            <div className="close-icon">
              <button onClick={closeMenu}>
                <i className="far fa-window-close"></i>
              </button>
            </div>
            <div className="explore-content px-3 pos-relative">
                <div className="row">
                    <div className="col-md-3 bg-light p-5 bg-illustration">

                        <div className="inner-content">
                            <div className="image">
                                <img src={dylan3} />
                            </div>
                            <div className="menu">
                                <Link to={"/"}><h4>Home</h4></Link>
                                <Link to={"/updates"}><h4>Project Updates</h4></Link>
                                <Link to={"/pollutionreporter"}><h4>Pollution Reporter</h4></Link>
                                <Link to={"/news"}><h4>News</h4></Link>
                                <Link to={"/resources"}><h4>Resources</h4></Link>
                                <Link to={"/get-involved"}><h4>Participate</h4></Link>
                                <Link to={"/references"}><h4>References</h4></Link>
                                <Link to={"/contact"}><h4>Contact Us</h4></Link>

                                <div className="social-icon-right mt-40">
                                    <a href="https://twitter.com/LandandRefinery/">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href="https://www.instagram.com/LandandRefinery/">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9" style={{height: "inherit"}}>
                      <div className="row">
                        <div className="col-12">
                          <h2 data-animation="fadeInUp" data-delay=".5s" className="mt-80 pl-4">
                            Explore the Research
                          </h2>
                        </div>
                      </div>

                      <div className="row">
                        <div className="d-none d-md-block col-md-3 col-lg-4">
                          <div className="pl-4">
                            <TopicSelector />
                          </div>
                        </div>
                        <div className="col-md-9 col-lg-8">
                          <div className="mt-40 mb-40 pr-3" style={{ height: "calc(100vh - 210px)", overflow: "auto" }}>
                            <Explore />
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

            </div>
        </div>
      </aside>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPageNavigation);
