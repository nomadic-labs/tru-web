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
    this.props.onUpdatePageData("home", id, content);
  };

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};

    return (
      <Layout>
        <main>
          <div className="slider-area pos-relative">
            <div className="shape d-none d-xl-block">
                <div className="shape-item slider-02 bounce-animate"><img src="img/slider/sl2.png" alt="" /></div>
                <div className="shape-item slider-03 bounce-animate"><img src="img/slider/sl3.png" alt="" /></div>
                <div className="shape-item slider-04 bounce-animate"><img src="img/slider/sl4.png" alt="" /></div>
                <div className="shape-item slider-05 bounce-animate"><img src="img/slider/sl5.png" alt="" /></div>
            </div>
            <div className="slider-active">
              <EditableBackgroundImage classes="single-slider full-screen d-flex align-items-center" content={content["header-bg"]} handleSave={this.onSave("header-bg")}>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-10 col-lg-10 offset-lg-1 offset-xl-1">
                      <div className="slider-content slider-text slider-2-text text-center mt-80">
                        <h1 data-animation="fadeInUp" data-delay=".5s">
                          <EditableText content={content["demo-title"]} handleSave={this.onSave("demo-title")} />
                        </h1>
                        <span data-animation="fadeInUp" data-delay=".3s">
                          <EditableParagraph content={content["demo-subtitle"]} handleSave={this.onSave("demo-subtitle")} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </EditableBackgroundImage>
            </div>
          </div>

          <Section className="wow fadeIn pt-80 pb-80">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
              </h2>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-light">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["territory-title"]} handleSave={this.onSave("territory-title")} />
              </h2>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["territory-description"]} handleSave={this.onSave("territory-description")} />
              </div>
            </Container>
            <ImageCarousel />
            <Container>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["territory-description2"]} handleSave={this.onSave("territory-description2")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["research-title"]} handleSave={this.onSave("research-title")} />
              </h2>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["research-description"]} handleSave={this.onSave("research-description")} />
              </div>
            </Container>

          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-primary">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["cr-app-title"]} handleSave={this.onSave("cr-app-title")} />
              </h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="mt-40 mb-40">
                    <EditableImageUpload />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mt-40 mb-40">
                    <EditableParagraph content={content["cr-app-description"]} handleSave={this.onSave("cr-app-description")} />
                  </div>
                  <EditableLink classes={"btn"} ontent={content["cr-app-button"]} handleSave={this.onSave("cr-app-button")} />
                </div>
              </div>
            </Container>
          </Section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

export const query = graphql`
  query {
    pages(id: { eq: "home" }) {
      id
      content
      title
      slug
    }
  }
`;


