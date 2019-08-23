import React from "react";
import Container from "./Container";
import { Link, StaticQuery, graphql } from "gatsby";
import { connect } from "react-redux";
import { EditableParagraph, EditableText } from "react-easy-editables";

import { updateFirebaseData } from "../../redux/actions";


const mapDispatchToProps = dispatch => {
  return {
    updateFirebaseData: (data, callback) => {
      dispatch(updateFirebaseData(data, callback))
    },
  };
};


class Footer extends React.Component {

  constructor(props) {
    super(props)
    console.log("this.props.data", this.props.data)
    this.state = { content: this.props.data.meta.about.content }
  }

  updateContent = id => input => {
    console.log('id', id)
    console.log('input', input)

    const dataToUpdate = {
      [`meta/footer/about/content/${id}`]: input
    }

    this.props.updateFirebaseData(dataToUpdate, () => {
      console.log('done updating')
      this.setState({
        content: {
          ...this.state.content,
          [id] : input
        }
      })
    })
  }

  render() {
    const content = this.state.content || {};

    return (
      <footer className="footer-area footer1 bg-light bg-decorated pt-75">
        <Container>
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4">
                <div className="footer-wrapper mb-30">
                    <div className="footer-title">
                      <h4>Menu</h4>
                    </div>
                    <ul className="footer-menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/updates">Project Updates</Link></li>
                        <li><Link to="/pollutionreporter">Pollution Reporter</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/resources">Resources</Link></li>
                        <li><Link to="/get-involved">Participate</Link></li>
                        <li><Link to="/references">References</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </div>

            <div className="col-xl-8 col-lg-8 col-md-8">
                <div className="footer-wrapper mb-30">
                    <div className="footer-title">
                        <h4>
                          <EditableText content={ content["title"] } onSave={ this.updateContent("title") } />
                        </h4>
                    </div>
                    <div className="footer-content">
                        <EditableParagraph content={ content["description"] } onSave={ this.updateContent("description")  } />
                    </div>
                </div>
            </div>
          </div>
          <div className="footer-border mt-30 pt-20 pb-25">
            <div className="row">
                <div className="col-xl-12 text-center">
                    <div className="copyright">
                        <p>Copyright <i className="far fa-copyright"></i> 2019 <a href="https://technoscienceunit.org/">TRU.</a> All Rights Reserved</p>
                    </div>
                </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

}

const FooterContainer = props => (
  <StaticQuery
    query={graphql`
      query {
        meta {
          about {
            content {
              title {
                text
              }
              description {
                text
              }
            }
          }
        }
      }
    `}
    render={data => {
      return(
        <Footer data={data} {...props} />
      )
    }}
  />
)



export default connect(null, mapDispatchToProps)(FooterContainer);

