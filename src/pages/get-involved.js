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

const PAGE_ID = "get-involved"

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
            <Section className="wow fadeIn pt-80 pb-80 bg-light bg-leaf">
              <Container>
                <h2 data-animation="fadeInUp" data-delay=".5s">
                  <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
                </h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mt-40 mb-40">
                      <EditableImageUpload
                        classes="img-fluid"
                        content={content["get-involved-image"]}
                        onSave={this.onSave("get-involved-image")}
                        uploadImage={uploadImage}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mt-40 mb-40">
                      <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
                    </div>
                  </div>

                  <div className="col-12">
                    <h4 data-animation="fadeInUp" data-delay=".5s">
                      <EditableText content={content["intro-salutation"]} handleSave={this.onSave("intro-salutation")} />
                    </h4>
                  </div>
                </div>

              </Container>
            </Section>

            <Section className="wow fadeIn pt-80 pb-80 bg-flower">
                <Container>
                    <div className="row">
                        <div className="col-12 mb-30">
                            <div className="row">
                                <div className="col-xl-12">
                                  <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-20">
                                    <EditableText content={content["form-title"]} handleSave={this.onSave("form-title")} />
                                  </h2>
                                    <form action="https://formspree.io/thelandandtherefinery@gmail.com" method="POST" id="contact-form">
                                        <div className="row">
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Name" placeholder="Name" type="text" required={true} />
                                            </div>
                                            <div className="col-xl-6 col-md-6">
                                                <input name="Email" placeholder="Email address" type="email" required={true} />
                                            </div>
                                            <div className="col-md-12">
                                                <input name="Subject" placeholder="Subject" type="text" required={true} />
                                            </div>
                                            <div className="col-md-12">
                                                <textarea name="Message" cols="30" rows="10" placeholder="Message" required={true} ></textarea>
                                            </div>

                                            <div className="col-md-12">
                                              <input type="hidden" name="_next" value="https://www.landandrefinery.org/" />
                                              <input type="text" name="_honey" style={{display:"none"}} />
                                              <button className="btn btn-primary" type="submit">send message</button>
                                            </div>
                                        </div>
                                        <p className="ajax-response"></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-30">
                          <EditableParagraph content={content["form-post-text"]} handleSave={this.onSave("form-post-text")} />
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

export const query = graphql`
  query {
    pages(id: { eq: "get-involved" }) {
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


