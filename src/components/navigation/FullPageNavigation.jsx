import React from "react";
import { Link } from "gatsby";
import Grid from "@material-ui/core/Grid";

import { EditableImageUpload } from "react-easy-editables";

import Explore from "../common/Explore";
import Affix from "../common/Affix";
import TopicSelector from "../common/TopicSelector";
import plants06 from "../../assets/images/illustrations/plants-06.svg"

const styles = {
  button: {
    padding: '6px 25px',
  },
  fullWidth: {
    width: '100%'
  }
}


class FullPageNavigation extends React.Component {
  state = { menuOpen: false }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  render() {
    return (
      <aside>
        <div id="full-page-menu" className={`${this.state.menuOpen ? 'info-open' : ''}`}>
            <div className="sidebar d-flex justify-content-center align-items-center" onClick={this.toggleMenu}>
                <div className="rotate">
                    {
                        this.state.menuOpen ?
                        <div className="d-flex align-items-center justify-content-center">
                            <a>Go back</a><i className="fas fa-angle-up mx-2"></i>
                        </div> :
                        <div className="d-flex align-items-center justify-content-center">
                            <a>Explore</a><i className="fas fa-angle-down mx-2"></i>
                        </div>
                    }
                </div>
            </div>
            <div className="explore-content px-3">
                <div className="row">
                    <div className="col-md-3 bg-light p-5">
                        <div className="inner-content">
                            <div className="image">
                                <img src={plants06} style={{ width: "100px" }} />
                            </div>
                            <div className="menu">
                                <Link to={"/"}><h4>Resources</h4></Link>
                                <Link to={"/"}><h4>Timeline</h4></Link>
                                <Link to={"/"}><h4>Data Visualization</h4></Link>
                                <Link to={"/"}><h4>Chemical Responsibilities App</h4></Link>

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
                        <Grid container>
                          <Grid item xs={10} sm={2} md={3} lg={3}>
                              <TopicSelector />
                          </Grid>

                          <Grid item xs={10} sm={8} md={8} lg={8}>
                            <div className="pt-80 pb-80">
                              <h2 data-animation="fadeInUp" data-delay=".5s">
                                Explore the Research
                              </h2>
                              <div className="mt-40 mb-40" style={{ height: "calc(100vh - 210px)", overflow: "auto" }}>
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
    );
  }
}

export default FullPageNavigation;
