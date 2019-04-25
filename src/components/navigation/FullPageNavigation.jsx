import React from "react";
import { Link } from "gatsby";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import { EditableImageUpload } from "react-easy-editables";

import Explore from "../common/Explore";
import Affix from "../common/Affix";
import TopicSelector from "../common/TopicSelector";
import plants06 from "../../assets/images/illustrations/plants-06.svg";
import dylan5 from "../../assets/images/illustrations/Dylan_Minor5.png";

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
            <div className="explore-content px-3 pos-relative">
                <div className="row">
                    <div className="col-md-3 bg-light p-5">

                        <div className="inner-content">
                            <div className="image">
                                <img src={dylan5} style={{ width: "200px" }} />
                            </div>
                            <div className="menu">
                                <Link to={"/"}><h4>Resources</h4></Link>
                                <Link to={"/"}><h4>Timeline</h4></Link>
                                <Link to={"/"}><h4>Data Visualization</h4></Link>
                                <Link to={"/chemical-responsibilities-app"}><h4>Chemical Responsibilities App</h4></Link>

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
                        </div>
                    </div>

                    <div className="col-md-9" style={{height: "inherit"}}>
                        <div className="close-icon">
                            <button onClick={closeMenu}>
                                <i className="far fa-window-close"></i>
                            </button>
                        </div>
                        <Grid container>
                          <Grid item xs={10} sm={2} md={3} lg={3}>
                              <TopicSelector />
                          </Grid>

                          <Grid item xs={10} sm={8} md={8} lg={8}>
                            <div className="pt-80 pb-80">
                              <h2 data-animation="fadeInUp" data-delay=".5s">
                                Explore the Research
                              </h2>
                              <div className="mt-40 mb-40 pr-3" style={{ height: "calc(100vh - 210px)", overflow: "auto" }}>
                                <Explore />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                    </div>
                </div>

            </div>
        </div>
      </aside>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPageNavigation);
