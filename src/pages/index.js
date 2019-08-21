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
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.props.onLoadPageData(initialPageData);
  };

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

          <Section className="wow fadeIn pt-80 pb-80 pos-relative bg-white bg-flower">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
              </h2>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-light bg-illustration">
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

          <Section className="wow fadeIn pos-relative bg-white bg-flower">
              <Container>
                <h2 data-animation="fadeInUp" data-delay=".5s" className="mt-80">
                  Explore the Research
                </h2>
              </Container>
              <Grid container id="explore-container" justify="center">
                <Grid item xs={10} sm={10} md={11} lg={11}>
                </Grid>
                <Grid item xs={10} sm={2} md={3} lg={3}>

                  <div className="ml-5">
                    <TopicSelector />
                  </div>
                </Grid>

                <Grid item xs={10} sm={8} md={8} lg={8}>
                    <div className="mt-40 mb-40 pr-3" style={{ height: "calc(100vh - 210px)", overflow: "auto" }}>
                      <Explore />
                    </div>
                </Grid>
              </Grid>
          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-primary pos-relative">
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


