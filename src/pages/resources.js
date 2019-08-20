import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Masonry from 'react-masonry-component';

import { DEFAULT_COMPONENT_CONTENT } from '../utils/constants';

import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
  pushContentItem,
  removeContentItem
} from "../redux/actions";
import { EditableText, EditableParagraph, EditableBackgroundImage, EditableImageUpload, EditableLink } from "react-easy-editables";

import Layout from "../layouts/default.js";
import Section from "../components/common/Section";
import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";
import MasonryGallery from "../components/common/MasonryGallery";
import Collection from "../components/common/Collection";
import Publication from "../components/common/Publication";
import Reference from "../components/common/Reference";

import { uploadImage } from "../firebase/operations";

const PAGE_ID = "resources"

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePageData: (page, id, data) => {
      dispatch(updatePage(page, id, data));
    },
    onPushContentItem: (location, data) => {
      dispatch(pushContentItem(location, data))
    },
    onRemoveContentItem: (location, itemId) => {
      dispatch(removeContentItem(location, itemId))
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

class ResourcesPage extends React.Component {

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
          <Section id="featured-resources" className="wow fadeIn pt-80 pb-80 bg-white pos-relative">
            <Container sm={10} md={10} lg={10}>
              <div className="mb-5">
                <Publication
                  content={content["top-resource"]}
                  onSave={this.onSave('top-resource')}
                />
              </div>
              <MasonryGallery
                collection={content["featured-resources"]}
                GalleryComponent={Publication}
                onSave={this.onSave('featured-resources')}
                onAddItem={this.onAddItem('featured-resources')}
                onDeleteItem={this.onDeleteItem('featured-resources')}
                options={{slidesToShow: 4}}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['featured-resources']}
              />
            </Container>
          </Section>

        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesPage);

export const query = graphql`
  query {
    pages(id: { eq: "resources" }) {
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


