import React, { Component } from 'react';
import { connect } from 'react-redux';
//material UI
import { CssBaseline, Container, Typography, Link, Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//custom components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
//redux action
import { loadArticles } from '../redux/actions/actions';
const defaultCoverUrl =
  'https://res.cloudinary.com/blog-bits/image/upload/v1574889678/defaultCover_ndxi5v.jpg';

function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
}

const useStyles = theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

class LandingPage extends Component {
  UNSAFE_componentWillMount() {
    this.props.loadArticles();
  }

  render() {
    const { classes } = this.props;
    const featuredPost = this.props.articles[this.props.articles.length - 1];

    return (
      <>
        <CssBaseline />
        <Header />
        <Container maxWidth='lg'>
          {/* Main featured post */}
          {featuredPost && (
            <Paper className={classes.mainFeaturedPost}>
              {
                <img
                  style={{ display: 'none' }}
                  src={
                    featuredPost.coverImage
                      ? featuredPost.coverImage
                      : 'https://source.unsplash.com/user/erondu'
                  }
                  alt={featuredPost.title}
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography component='h1' variant='h3' color='inherit' gutterBottom>
                      {featuredPost.title}
                    </Typography>
                    <Typography variant='h5' color='inherit' paragraph>
                      {extractContent(featuredPost.text).substr(0, 300) + ' '}
                    </Typography>
                    <Link variant='subtitle1' href={`/articleview/${featuredPost._id}`}>
                      Continue reading…
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          )}
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {this.props.articles.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <CardActionArea component='a' href={`/articleview/${post._id}`}>
                  <Card className={classes.card}>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={post.coverImage ? post.coverImage : defaultCoverUrl}
                        title={post.title}
                      />
                    </Hidden>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component='h2' variant='h5'>
                          {post.title}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                          {post.date}
                        </Typography>
                        <Typography variant='subtitle1' paragraph>
                          {extractContent(post.text).substr(0, 100)}
                        </Typography>
                        <Typography variant='subtitle1' color='primary'>
                          Continue reading...
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}
        </Container>
        <Footer />
      </>
    );
  }
}

const LandingPageComp = withStyles(useStyles, 'withTheme')(LandingPage);

const mapStateToProps = state => {
  console.log('mapStateToProps : ', state.articles.articles);
  return {
    articles: state.articles.articles,
  };
};

export default connect(mapStateToProps, { loadArticles })(LandingPageComp);
