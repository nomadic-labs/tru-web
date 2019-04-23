import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
} from "../redux/actions";
import { EditableText, EditableParagraph, EditableBackgroundImage, EditableImageUpload, EditableLink } from "react-easy-editables";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import ImageCarousel from "../components/common/ImageCarousel";

import { uploadImage } from "../firebase/operations";

const PAGE_ID = "contact"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onLoadPageData: data => {
      dispatch(loadPageData(data));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data
  };
};

class HomePage extends React.Component {

  componentDidMount() {
    console.log(this.props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  onSave = id => content => {
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};

    return (
      <Layout>
        <main>
          <EditableBackgroundImage classes="breadcrumb-area pt-260 pb-180"
            content={content["header-bg"]}
            handleSave={this.onSave("header-bg")}
            uploadImage={ uploadImage }
            styles={{ backgroundColor: "transparent" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="breadcrumb-text text-center">
                    <h1><EditableText content={content["contact-title"]} onSave={this.onSave("contact-title")} /></h1>
                  </div>
                </div>
              </div>
            </div>
          </EditableBackgroundImage>
            <div className="contact-area pt-115 pb-75">
                <Container>
                    <div className="row">
                        <div className="col-12 mb-30">
                            <div className="contact-adddress-wrapper">
                                <ul className="contact-list-address">
                                    <li>
                                        <div className="contact-icon">
                                            <i className="fa fa-map-marker-alt"></i>
                                        </div>
                                        <div className="contact-address-text">
                                            <h5>Address</h5>
                                            <p>
                                              <EditableText content={content["contact-address"]} onSave={this.onSave("contact-address")} />
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-icon">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <div className="contact-address-text">
                                            <h5>Email</h5>
                                            <p>
                                              <EditableText content={content["contact-email"]} onSave={this.onSave("contact-email")} />
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-icon">
                                            <i className="fa fa-phone"></i>
                                        </div>
                                        <div className="contact-address-text">
                                            <h5>Phone</h5>
                                            <p>
                                              <EditableText content={content["contact-phone"]} onSave={this.onSave("contact-phone")} />
                                            </p>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <div className="col-12 mb-30">
                            <div className="row">
                                <div className="col-xl-12">
                                    <form action="assets/mail.php" id="contact-form">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6">
                                                <input name="name" placeholder="Name" type="text" />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="email" placeholder="Email address" type="email" />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="text" placeholder="Phone number" type="text" />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="text" placeholder="Subject" type="text" />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea name="message" cols="30" rows="10" placeholder="Message"></textarea>
                                                <button className="btn" type="submit">send message</button>
                                            </div>
                                        </div>
                                        <p className="ajax-response"></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "contact" }) {
      id
      content
      title
      slug
    }
  }
`;


