import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import {
  updatePage,
  loadPageData,
} from "../redux/actions";
import {
  EditableText,
  EditableParagraph,
  EditableBackgroundImage,
  EditableImageUpload,
  EditableLink,
  EditableEmbeddedIframe,
} from "react-easy-editables";

import { uploadImage } from "../firebase/operations";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import ImageCarousel from "../components/common/ImageCarousel";
import Explore from "../components/common/Explore";
import Affix from "../components/common/Affix";
import TopicSelector from "../components/common/TopicSelector";
import EmbeddedIframe from "../components/common/EmbeddedIframe";


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
    pageData: state.page.data,
    isEditingPage: state.adminTools.isEditingPage,
  };
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.exploreContainer = React.createRef();
  }

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
            <div className="slider-active" data-animation="fadeIn">
              <EditableBackgroundImage
                classes="single-slider full-screen d-flex align-items-center"
                content={content["header-bg"]}
                handleSave={this.onSave("header-bg")}
                uploadImage={ uploadImage }
                styles={{ backgroundColor: "transparent" }}
              >
                <div className="container">
                  <div className="row">
                    <div className="col-xl-10 col-lg-10 offset-lg-1 offset-xl-1">
                      <div className="slider-content slider-text slider-2-text text-center mt-80">
                        <h1 data-animation="fadeInUp" data-delay=".5s">
                          <EditableText content={content["demo-title"]} handleSave={this.onSave("demo-title")} />
                        </h1>
                        <span data-animation="fadeInUp" data-delay=".3s">
                          <EditableText content={content["demo-subtitle"]} handleSave={this.onSave("demo-subtitle")} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </EditableBackgroundImage>
            </div>
          </div>

          <Section className="wow fadeIn pt-80 pb-80 pos-relative">
            <div className="shape d-none d-xl-block">
              <div className={`shape-item slider-03 ${this.props.isEditingPage ? '' : 'bounce-animate'}`}>
                <EditableImageUpload
                  content={content["intro-img-1"]}
                  onSave={this.onSave("intro-img-1")}
                  styles={{ container: {width: "5vw"} }}
                  uploadImage={uploadImage}
                />
              </div>
              <div className={`shape-item slider-04 ${this.props.isEditingPage ? '' : 'bounce-animate'}`} style={{ left: "3%" }}>
                <EditableImageUpload
                  content={content["intro-img-2"]}
                  onSave={this.onSave("intro-img-2")}
                  styles={{ container: {width: "15vw"} }}
                  uploadImage={uploadImage}
                />
              </div>
            </div>
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
              </h2>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-lighter">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["territory-title"]} handleSave={this.onSave("territory-title")} />
              </h2>
            </Container>

            <Container>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["territory-description"]} handleSave={this.onSave("territory-description")} />
              </div>
            </Container>

            <EmbeddedIframe content={{ src: "https://www.google.com/maps/d/embed?mid=1KguylevGy353eIjdwTMvgsePsSlrsjNW" }} />

            <Container>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["territory-description1"]} handleSave={this.onSave("territory-description1")} />
              </div>
            </Container>
            <ImageCarousel onSave={this.onSave} content={content} />
            <Container>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["territory-description2"]} handleSave={this.onSave("territory-description2")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pos-relative">
            <div className="shape d-none d-xl-block">
              <div className={`shape-item slider-03 ${this.props.isEditingPage ? '' : 'bounce-animate'}`} style={{top: "60px"}}>
                <EditableImageUpload
                  content={content["intro-img-3"]}
                  onSave={this.onSave("intro-img-3")}
                  styles={{ container: {width: "120px"} }}
                  uploadImage={uploadImage}
                />
              </div>
            </div>

            <Grid container id="explore-container">
              <Grid item xs={10} sm={2} md={3} lg={3}>
                <Affix container={"#explore-container"}>
                  <TopicSelector />
                </Affix>
              </Grid>

              <Grid item xs={10} sm={8} md={6} lg={6}>
                <div className="pt-80 pb-80">
                  <h2 data-animation="fadeInUp" data-delay=".5s">
                    <EditableText content={content["research-title"]} handleSave={this.onSave("research-title")} />
                  </h2>
                  <div className="mt-40 mb-40">
                    <EditableParagraph content={content["research-description"]} handleSave={this.onSave("research-description")} />
                    <Explore />
                  </div>
                </div>
              </Grid>
            </Grid>

          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-primary pos-relative">
            <div className="shape d-none d-xl-block">
              <div className={`shape-item pro-01 ${this.props.isEditingPage ? '' : 'bounce-animate invert-color'}`}>
                <EditableImageUpload
                  content={content["intro-img-4"]}
                  onSave={this.onSave("intro-img-4")}
                  styles={{ container: {width: "3vw"} }}
                  uploadImage={uploadImage}
                />
              </div>

              <div className={`shape-item pro-02 ${this.props.isEditingPage ? '' : 'bounce-animate invert-color'}`}>
                <EditableImageUpload
                  content={content["intro-img-5"]}
                  onSave={this.onSave("intro-img-5")}
                  styles={{ container: {width: "6vw"} }}
                  uploadImage={uploadImage}
                />
              </div>

              <div className={`shape-item pro-03 ${this.props.isEditingPage ? '' : 'bounce-animate invert-color'}`}>
                <EditableImageUpload
                  content={content["intro-img-6"]}
                  onSave={this.onSave("intro-img-6")}
                  styles={{ container: {width: "3vw"} }}
                  uploadImage={uploadImage}
                />
              </div>

              <div className={`shape-item pro-04 ${this.props.isEditingPage ? '' : 'bounce-animate invert-color'}`}>
                <EditableImageUpload
                  content={content["intro-img-7"]}
                  onSave={this.onSave("intro-img-7")}
                  styles={{ container: {width: "2vw"} }}
                  uploadImage={uploadImage}
                />
              </div>

            </div>
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["cr-app-title"]} handleSave={this.onSave("cr-app-title")} />
              </h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="mt-40 mb-40">
                    <EditableImageUpload
                      classes="img-fluid"
                      content={content["cr-app-image"]}
                      onSave={this.onSave("cr-app-image")}
                      uploadImage={uploadImage}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mt-40 mb-40 text-white">
                    <EditableParagraph content={content["cr-app-description"]} handleSave={this.onSave("cr-app-description")} />
                  </div>
                  <EditableLink classes={"btn"} content={content["cr-app-button"]} handleSave={this.onSave("cr-app-button")} />
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


