import React from "react";
import Container from "./Container";

export default (props) => {
  return (
    <footer className="footer-area footer1 bg-light pt-75">
      <Container>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="footer-wrapper mb-30">
                  <div className="footer-title">
                    <h4>Links</h4>
                  </div>
                  <ul className="footer-menu">
                      <li><a href="#">Help and Ordering</a></li>
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Return &amp; Cancellation</a></li>
                      <li><a href="#">Delevery Schedule</a></li>
                      <li><a href="#">Get a Call</a></li>
                      <li><a href="#">Online Enquiry</a></li>
                      <li><a href="#">My Account</a></li>
                  </ul>
              </div>
          </div>

          <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="footer-wrapper mb-30">
                  <div className="footer-title">
                      <h4>Newsletter</h4>
                  </div>
                  <div className="footer-content">
                      <p>Subscribe for news and updates</p>
                  </div>
                  <div className="subscribes-form">
                      <form action="#">
                          <input placeholder="Enter your email" type="email" />
                          <button className="btn">Subscribe</button>
                      </form>
                  </div>
              </div>
          </div>
        </div>
        <div className="footer-border mt-30 pt-20 pb-25">
          <div className="row">
              <div className="col-xl-12 text-center">
                  <div className="copyright">
                      <p>Copyright <i className="far fa-copyright"></i> 2019 <a href="#">TRU.</a> All Rights Reserved</p>
                  </div>
              </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};


