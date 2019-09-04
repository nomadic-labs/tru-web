import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
  pushContentItem,
  removeContentItem,
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
import { DEFAULT_COMPONENT_CONTENT } from '../utils/constants';

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import ImageCarousel from "../components/common/ImageCarousel";
import Explore from "../components/common/Explore";
import Affix from "../components/common/Affix";
import TopicSelector from "../components/common/TopicSelector";
import EmbeddedIframe from "../components/common/EmbeddedIframe";
import HomePageHeader from "../components/common/HomePageHeader";
import Publication from "../components/common/Publication";
import Carousel from "../components/common/Carousel";

import ArrowDown from "../assets/images/green-arrow.svg";

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
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
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

  onAddItem = id => content => {
    this.props.onPushContentItem(id, content);
  }

  onDeleteItem = id => itemId => {
    this.props.onRemoveContentItem(id, itemId)
  }

  render() {
    const pageData = this.props.pageData ? this.props.pageData : this.props.data.pages;
    const content = this.props.pageData ? this.props.pageData.content : JSON.parse(this.props.data.pages.content);

    return (
      <Layout location={this.props.location} palette={"default"}>
        <main>
          <HomePageHeader
            title={pageData.title}
            onSave={this.onSave}
            content={ content }
            headerImage={pageData.header_image}
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />

        {
          //<Section className="wow fadeIn pt-80 pb-80 pos-relative basic-section">
            //  <Container>
            //    <h2 data-animation="fadeInUp" data-delay=".5s">
          //        <EditableText content={content["intro-title"]} handleSave={this.onSave("intro-title")} />
          //      </h2>
          //      <div className="mt-40">
        //          <EditableParagraph content={content["intro-description"]} handleSave={this.onSave("intro-description")} />
        //          <EditableLink classes={"btn btn-primary mt-20"} content={content["intro-more-btn"]} handleSave={this.onSave("intro-more-btn")} />
        //        </div>
        //      </Container>
      //      </Section>
        }

          <Section id="featured-news" className="wow fadeIn pt-80 pb-80 basic-section">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-4">
                <EditableText content={content["featured-news-title"]} onSave={this.onSave("featured-news-title")} />
              </h2>
              <Carousel
                collection={content["featured-news"]}
                SlideComponent={Publication}
                onSave={this.onSave('featured-news')}
                onAddItem={this.onAddItem('featured-news')}
                onDeleteItem={this.onDeleteItem('featured-news')}
                options={{slidesToShow: 1}}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['featured-news']}
              />
              <div className="mt-40">
                <EditableParagraph content={content["news-description"]} handleSave={this.onSave("news-description")} />
                <EditableLink classes={"btn btn-primary mt-20"} content={content["news-more-btn"]} handleSave={this.onSave("news-more-btn")} />
              </div>
            </Container>
          </Section>

          <Section className="wow fadeIn pt-80 pb-40 basic-section">
            <Container>
              <h1 data-animation="fadeInUp" data-delay=".5s">
                <EditableText content={content["explore-stories-title"]} handleSave={this.onSave("explore-stories-title")} />
              </h1>
            </Container>

            <Container>
              <div className="mt-40 mb-40">
                <EditableParagraph content={content["explore-stories-description"]} handleSave={this.onSave("explore-stories-description")} />
              </div>

              <div id="start-here" className="pos-relative">
                <div className="text-center">
                  <a href="#first-story" data-scroll><h6 className="p-4">Start here</h6></a>
                </div>
                {
                  //<div className="vertical-line text-center">
                  //<img src={ArrowDown} style={{ height: '400px', maxHeight: '80vh' }} />
                  //</div>
                }
              </div>
            </Container>
          </Section>

          <Section id="featured-stories" className="wow fadeIn pt-80 pb-80 bg-light">
            <div id="first-story" className="first-story wow fadeIn pt-80 pb-80 bg-dylan">
              <section>
                <Container>
                  <h2 className="text-center mb-20">
                    <EditableText content={content["first-story-title"]} handleSave={this.onSave("first-story-title")} />
                  </h2>

                  <div className="card">
                    <EditableImageUpload
                             classes="img-fluid card-img-top"
                             content={content["first-story-bookcover"]}
                             onSave={this.onSave("first-story-bookcover")}
                             uploadImage={uploadImage}
                             />

                           <div className="pl-40 pr-40 pt-40 pb-40">
                    <EditableParagraph
                    content={content["first-story-description"]}
                    handleSave={this.onSave("first-story-description")}
                    />
                    </div>

                  </div>
                  <div className="text-center">
                    <EditableLink
                      classes={"btn btn-primary mt-30"}
                      content={content["first-story-button"]}
                      handleSave={this.onSave("first-story-button")}
                    />
                  </div>
                </Container>
              </section>
            </div>
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-40">
                <EditableText content={content["featured-stories-title"]} handleSave={this.onSave("featured-stories-title")} />
              </h2>
              <Carousel
                collection={content["featured-stories"]}
                SlideComponent={Publication}
                onSave={this.onSave('featured-stories')}
                onAddItem={this.onAddItem('featured-stories')}
                onDeleteItem={this.onDeleteItem('featured-stories')}
                options={{slidesToShow: 1}}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['featured-stories']}
              />
            </Container>



          </Section>

          <Section className="wow fadeIn pt-80 pb-80 bg-primary contrast-section">

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
                  <EditableLink classes={"btn btn-primary"} content={content["cr-app-button"]} handleSave={this.onSave("cr-app-button")} />
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
