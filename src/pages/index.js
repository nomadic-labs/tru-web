import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
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
import PageHeader from "../components/common/PageHeader";

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
        <main>
          <PageHeader
            title={pageData.title}
            onSave={this.onSave}
            content={ content }
            headerImage={pageData.header_image}
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />

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
                <EmbeddedIframe content={content["territory-gmap"]} handleSave={this.onSave("territory-gmap")} classes={"my-4"} xs={12} sm={12} md={12} lg={12} />
                <EditableParagraph content={content["territory-description1"]} handleSave={this.onSave("territory-description1")} />
                <EditableLink classes={"btn btn-primary mt-20"} content={content["territory-more-btn"]} handleSave={this.onSave("territory-more-btn")} />
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
                <TopicSelector />
              </Grid>

              <Grid item xs={10} sm={8} md={6} lg={6}>
                <div className="pt-80 pb-80">
                  <h2 data-animation="fadeInUp" data-delay=".5s">
                    <EditableText content={content["research-title"]} handleSave={this.onSave("research-title")} />
                  </h2>
                  <div className="mt-40">
                    <div style={{ maxHeight: "calc(100vh - 160px)", overflow: "auto" }}>
                      <Explore />
                    </div>
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
                  <EditableLink classes={"btn btn-secondary"} content={content["cr-app-button"]} handleSave={this.onSave("cr-app-button")} />
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
      header_image {
        imageSrc
      }
    }
  }
`;


