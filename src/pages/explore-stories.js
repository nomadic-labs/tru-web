import React from "react";
import { graphql } from "gatsby";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Parser from "rss-parser"

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
import Carousel from "../components/common/Carousel";
import Publication from "../components/common/Publication";
import Reference from "../components/common/Reference";
import Explore from "../components/common/Explore";
import Affix from "../components/common/Affix";
import TopicSelector from "../components/common/TopicSelector";
import dylan3 from "../assets/images/illustrations/Dylan_Minor3.png";

import { uploadImage } from "../firebase/operations";

const PAGE_ID = "news"

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

class NewsPage extends React.Component {

  constructor(props) {
    super(props);
    const initialPageData = {
      ...this.props.data.pages,
      content: JSON.parse(this.props.data.pages.content)
    };
    this.props.onLoadPageData(initialPageData);
    this.state = {
      items: []
    }
  };

  componentDidMount() {
    const parser = new Parser()
    const cors_proxy = "https://cors-anywhere.herokuapp.com/"
    const url = 'https://news.google.com/rss/search?q=Sarnia+OR+aamjiwnaang+OR+%22imperial+oil%22+OR+%22chemical+valley%22)+AND+(spill+OR+leak+OR+flare+OR+pollution+Or+release+-%22news+release%22)&hl=en-CA&gl=CA&ceid=CA:en'
    const feed = parser.parseURL(cors_proxy + url, (err, data) => {
      if (err) {
        return console.error(err)
      }

      this.setState({ items: data.items })
    })

  }

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
    let orderedNewsItems = [...this.state.items]
    orderedNewsItems.sort((a,b) => {
      const time1 = new Date(a.pubDate).getTime();
      const time2 = new Date(b.pubDate).getTime();
      if (time1 > time2) {
        return -1
      } else {
        return 1
      }
      return 0
    })

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
          <Section id="explore-stories" className="wow fadeIn pt-40 pb-40 bg-white pos-relative">
            <div className="mx-5">
              <div className="explore-content px-3 pos-relative">
                <div className="row">
                  <div className="d-none d-md-block col-md-3 col-lg-4">
                    <div className="pl-4">
                      <TopicSelector />
                    </div>
                  </div>
                  <div className="col-md-9 col-lg-8">
                    <div className="mt-40 mb-40 pr-3">
                      <Explore />
                    </div>
                  </div>
                  </div>
                </div>
            </div>
          </Section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);

export const query = graphql`
  query {
    pages(id: { eq: "explore-stories" }) {
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


