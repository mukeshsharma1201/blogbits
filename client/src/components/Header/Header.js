import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <div>
        <div data-react-className='UserOverlay' data-react-props='{}'>
          <div className='overlay overlay-hugeinc ' data-reactroot=''>
            <button className='overlay-close'>
              <span className='glyphicon glyphicon-remove'></span>
            </button>
            <nav className='users-overlay'>
              <h2 className='grayed-heading center'></h2>
              <ul>
                <li className='pagination-button-group'></li>
              </ul>
            </nav>
          </div>
        </div>

        <div data-behavior='progress-bar' className='progress-bar'></div>

        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container-fluid'>
            {/* Left Side Icon*/}
            <ul className='col-md-12'>
              <li className='nav navbar-nav navbar-left col-md-1'>
                <div className='navbar-header navbar-left col-md-1'>
                  <a className='navbar-brand' id='logo' href='/'>
                    <img alt='Stories' src='/assets/img/stories-logo.svg' height='40' />
                  </a>
                </div>
              </li>
              {/* Center TITLE*/}
              <li className='nav navbar-nav filter-links col-md-11 col-md-offset-6'>
                <a
                  className='h1'
                  style={{
                    color: '#000000',
                    float: 'none',
                    fontFamily: 'Tangerine',
                    fontWeight: 'bold',
                  }}
                  href='/'
                >
                  Blog Bits
                </a>
              </li>
              {/* Right Options*/}
              <li className='folding-nav'>
                <ul className='nav navbar-nav navbar-right'>
                  {this.props.isAuth ? (
                    <li className='new-post-button'>
                      <a className='button' data-behavior='trigger-overlay' href='/editor'>
                        Write a story
                      </a>
                    </li>
                  ) : (
                    ''
                  )}
                  {this.props.isAuth ? (
                    ''
                  ) : (
                    <li onClick={this.props.openSignInWith} className='sign-in-button'>
                      <a
                        className='button green-border-button'
                        data-behavior='trigger-overlay'
                        href='#'
                      >
                        Sign in / Sign up
                      </a>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authUser.user,
    isAuth: state.authUser.isAuth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openSignInWith: () => {
      dispatch({ type: 'TOGGLE_MODAL', modalMode: true });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
