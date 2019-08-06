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
import Collection from "../components/common/Collection";
import Publication from "../components/common/Publication";
import Reference from "../components/common/Reference";

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
          <Section id="featured-resources" className="wow fadeIn pt-80 pb-80 bg-primary pos-relative">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-4">
                <EditableText content={content["featured-resources-title"]} onSave={this.onSave("featured-resources-title")} />
              </h2>
            </Container>
            <div className="mx-5">
              <Carousel
                collection={content["featured-resources"]}
                SlideComponent={Publication}
                onSave={this.onSave('featured-resources')}
                onAddItem={this.onAddItem('featured-resources')}
                onDeleteItem={this.onDeleteItem('featured-resources')}
                options={{slidesToShow: 4}}
                isEditingPage={this.props.isEditingPage}
                defaultContent={DEFAULT_COMPONENT_CONTENT['featured-resources']}
              />
            </div>
          </Section>

          <Section id="references" className="wow fadeIn pt-80 pb-80">
            <Container>
              <h2 data-animation="fadeInUp" data-delay=".5s" className="mb-4">
                <EditableText content={content["references-title"]} onSave={this.onSave("references-title")} />
              </h2>
              <div className="mt-30">
                {
                  orderedNewsItems.map(item => {
                    const date = new Date(item.pubDate)
                    const dateString = date.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                    return(
                      <div className="news-item mb-30 pb-10" key={item.guid}>
                        <p className="text-muted date">{dateString}</p>
                        <div dangerouslySetInnerHTML={ {__html: item.content} } />
                      </div>
                    )
                  })
                }
              </div>
            </Container>
          </Section>
        </main>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);

export const query = graphql`
  query {
    pages(id: { eq: "news" }) {
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

