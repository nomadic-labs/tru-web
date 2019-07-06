import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";

import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
  updateTitle,
  updateHeaderImage,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import PageHeader from "../components/common/PageHeader";
import DynamicSection from "../components/editing/DynamicSection";
import Footnotes from "../components/common/Footnotes"
import Definitions from "../components/common/Definitions"
import PageNavigation from "../components/common/PageNavigation"
import PageTopics from "../components/common/PageTopics"

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


class SingleColumnPage extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content),
      footnotes: JSON.parse(this.props.data.pages.footnotes),
      definitions: JSON.parse(this.props.data.pages.definitions),
    };
    this.props.onLoadPageData(initialPageData);
  };

  onSave = id => content => {
    this.props.onUpdatePageData(this.props.data.pages.id, id, content);
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
    const sections = content.sections && content.sections.length > 0 ? content.sections : [{ content: [] }];

    return (
      <div>
        <Layout location={this.props.location} palette={pageData.palette}>
          <Helmet>
            <title>{pageData.title}</title>
          </Helmet>
          <PageHeader
            title={pageData.title}
            onSave={this.onSave}
            content={ content }
            headerImage={pageData.header_image}
            onUpdateHeaderImage={this.onUpdateHeaderImage}
            onUpdateTitle={this.onUpdateTitle}
          />
          <PageTopics />
          {
            sections.map((section, index) => {
              return(
                <DynamicSection
                  content={ section.content }
                  sectionIndex={index}
                  key={index}
                  type={ section.type }
                />
              )
            })
          }
          <PageNavigation />
          <Footnotes />
          <Definitions />
        </Layout>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleColumnPage);

export const query = graphql`
  query BasicPageQuery($slug: String!) {
    pages(slug: { eq: $slug }) {
      id
      content
      title
      slug
      template
      palette
      topics
      order
      category
      menuTitle
      footnotes
      definitions
      header_image {
        imageSrc
      }
      prev
      next
    }
  }
`;
