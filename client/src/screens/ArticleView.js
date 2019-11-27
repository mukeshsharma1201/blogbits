import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticle, clap, follow } from './../redux/actions/actions';
import PropTypes from 'prop-types';
// import FollowButton from './FollowButton'
import Header from '../components/Header/Header';
const mapStateToProps = state => {
  return {
    _article: state.articles.article,
    user: state.authUser.user,
  };
};

class ArticleView extends Component {
  componentDidMount() {
    document.body.className = 'posts show';
  }

  componentWillMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  componentWillUnmount() {
    document.body.className = '';
  }

  render() {
    const { text, upvotes, title, coverImage, author, categories } = this.props._article;
    let author_name, author_img, author_id;
    if (author) {
      const { name, provider_pic, uid } = author;
      author_name = name;
      author_id = uid;
      author_img = provider_pic
        ? provider_pic
        : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown_1-2-48.png';
    }
    return (
      <div>
        <div className='container-fluid main-container'>
          <Header />
          <div className='row animated fadeInUp'>
            <div
              id='main-post'
              className='col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content'
            >
              <div className='pull-right'>
                {/* {this.props.user ? <FollowButton user={`${this.props.user.following}`} to_follow={`${author_id}`} /> : ''} */}
              </div>

              <div className='post-metadata'>
                <img
                  alt={author_name}
                  className='avatar-image'
                  src={author_img}
                  height='40'
                  width='40'
                />
                <div className='post-info'>
                  <div>
                    <span className='popover-link' data-reactroot=''>
                      <a href={`/profile/${author_id}`}>{author_name}</a>
                    </span>
                  </div>
                  <small>Published • blog post</small>
                </div>
              </div>

              {!coverImage || !coverImage.length > 0 ? (
                ''
              ) : (
                <div className='post-picture-wrapper'>
                  <img src={coverImage} alt='feature img 540' />
                </div>
              )}

              <h3 className='title'>{title}</h3>
              <div className='body'>
                <p></p>
                <p className='' dangerouslySetInnerHTML={{ __html: text }}></p>
                <p></p>
              </div>

              <div className='post-tags'>
                <a className='tag' href=''>
                  Story
                </a>
                <a className='tag' href=''>
                  Community
                </a>
                {categories &&
                  categories.map(item => (
                    <a className='tag' href=''>
                      item.name
                    </a>
                  ))}
              </div>

              <div className='post-stats clearfix'>
                <div className='pull-left'>
                  <div className='like-button-wrapper'>
                    <button
                      onClick={() => this.props.clap(this.props._article._id)}
                      className='like-button'
                      data-behavior='trigger-overlay'
                      type='submit'
                    >
                      <i className='fa fa-heart-o'></i>
                      <span className='hide-text'>Like</span>
                    </button>
                    <span className='like-count'>{upvotes}</span>
                  </div>
                </div>
                <div className='pull-left'>
                  <a className='response-icon-wrapper' href='#'>
                    <i className='fa fa-comment-o'></i>
                    <span className='response-count' data-behavior='response-count'>
                      0
                    </span>
                  </a>
                </div>

                <div className='pull-right'>
                  <div className='bookmark-button-wrapper'>
                    <form className='button_to' method='get' action=''>
                      <button
                        className='bookmark-button'
                        data-behavior='trigger-overlay'
                        type='submit'
                      >
                        {' '}
                        <span className='icon-bookmark-o'></span>
                        <span className='hide-text'>Bookmark</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*function mapStateToProps (state, ownProps) {
    const article_id = ownProps.match.params.id
    let article = {}
    state.articles.articles.forEach((_article)=>{
        if(article_id == _article._id) {
            article = _article
        }
    })
    return { article }
}*/
// ArticleView.propTypes = {
//   params: PropTypes.object.isRequired,
// };
export default connect(mapStateToProps, {
  getArticle,
  clap,
  follow,
})(ArticleView);
