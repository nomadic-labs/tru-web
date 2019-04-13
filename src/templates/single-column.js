import React from "react";
import { graphql } from "gatsby";

import Helmet from "react-helmet";

import { connect } from "react-redux";
import {
  updatePage,
  loadPageData,
} from "../redux/actions";

import Layout from "../layouts/default.js";
import DynamicSection from "../components/editing/DynamicSection";

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


class SingleColumnPage extends React.Component {
  static propTypes = {};

  componentDidMount() {
    console.log(this.props)
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };

    this.props.onLoadPageData(initialPageData);
  }

  render() {
    const content = this.props.pageData ? this.props.pageData.content : {};
    const sections = content.sections || [];
    console.log(content)

    return (
      <div>
        <Helmet>
          <title>DEMO</title>
        </Helmet>
        <Layout>
          {
            sections.map((section, index) => {
              return <DynamicSection content={ section.content } key={index} />
            })
          }
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
      navigation {
        displayTitle
        order
      }
    }
  }
`;
