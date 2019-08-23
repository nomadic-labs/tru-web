import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
} from "../redux/actions";
import { EditableText, EditableParagraph, EditableBackgroundImage, EditableImageUpload, EditableLink } from "react-easy-editables";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import ImageCarousel from "../components/common/ImageCarousel";
import PageHeader from "../components/common/PageHeader";

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
    onUpdateTitle: title => {
      dispatch(updateTitle(title));
    },
    onUpdateHeaderImage: image => {
      dispatch(updateHeaderImage(image));
    },
  };
};

const mapStateToProps = state => {
  return {
    pageData: state.page.data
  };
};

class ContactPage extends React.Component {

  constructor(props) {
    super(props);
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.props.onLoadPageData(initialPageData);
  };

  onSave = id => content => {
    this.props.onUpdatePageData(PAGE_ID, id, content);
  };

  onUpdateTitle = content => {
    this.props.onUpdateTitle(content.text)
  }

  onUpdateHeaderImage = content => {
    this.props.onUpdateHeaderImage(content)
  }

  render() {
    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout location={this.props.location}>
        <Helmet>
          <title>{pageData.title}</title>
        </Helmet>
        <main>
            <PageHeader
              title={pageData.title}
              onSave={this.onSave}
              content={ content }
              headerImage={pageData.header_image}
              onUpdateHeaderImage={this.onUpdateHeaderImage}
              onUpdateTitle={this.onUpdateTitle}
            />
            <div className="contact-area pt-115 pb-75 bg-white bg-flower-alt">
                <Container>
                    <div className="row">

                        <div className="col-12 mb-60">
                            <div className="row">
                                <div className="col-xl-12">
                                  <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-20">
                                    <EditableText content={content["form-title"]} handleSave={this.onSave("form-title")} />
                                  </h2>
                                    <form id="contact-form" action="https://formspree.io/thelandandtherefinery@gmail.com" method="POST" >
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Name" placeholder="Name" type="text" required={true} />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Email" placeholder="Email address" type="email" required={true} />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Phone number" placeholder="Phone number (optional)" type="text" />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Subject" placeholder="Subject" type="text" />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea name="message" cols="30" rows="10" placeholder="Message" required={true}></textarea>
                                            </div>

                                            <div className="col-md-12">
                                              <input type="hidden" name="_next" value="https://www.landandrefinery.org/" />
                                              <input type="text" name="_honey" style={{display:"none"}} />
                                              <button className="btn" type="submit">send message</button>
                                            </div>
                                        </div>
                                        <p className="ajax-response"></p>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mb-30">
                            <div className="contact-adddress-wrapper">
                                <ul className="contact-list-address">
                                    <li>
                                        <div className="contact-icon">
                                            <i className="fa fa-info"></i>
                                        </div>
                                        <div className="contact-address-text">
                                            <h5>The Land and the Refinery Project</h5>
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
                                              <EditableLink content={content["contact-email"]} onSave={this.onSave("contact-email")} />
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="contact-icon">
                                            <i className="fa fa-external-link-alt"></i>
                                        </div>
                                        <div className="contact-address-text">
                                            <h5>Website</h5>
                                            <p>
                                              <EditableLink content={content["contact-website"]} onSave={this.onSave("contact-website")} />
                                            </p>
                                        </div>
                                    </li>
                                </ul>

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

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

export const query = graphql`
  query {
    pages(id: { eq: "contact" }) {
      id
      slug
      content
      title
      topics
      order
      category
      menuTitle
      header_image {
        imageSrc
      }
    }
  }
`;


