import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
class EditorHeader extends Component {
  render() {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <a className='navbar-brand' id='logo' href='/'>
                <img alt='Stories' src='/assets/img/stories-logo.svg' height='40' />
              </a>
            </div>

            <button
              onClick={() => this.props.publish()}
              className={
                this.props.loading === true
                  ? 'button green-inner-button dropdown-toggle'
                  : 'button green-border-button dropdown-toggle'
              }
              style={{ marginLeft: '50%' }}
              data-toggle='dropdown'
              role='button'
              aria-haspopup='true'
              aria-expanded='false'
            >
              {this.props.loading === true ? 'Publishing' : 'Publish'}{' '}
              <i className='fa fa-globe'></i>
            </button>
          </div>
        </nav>

        <div className='progress-bar'></div>
      </div>
    );
  }
}

export default EditorHeader;
