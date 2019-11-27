import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediumEditor from 'medium-editor';
import axios from 'axios';
import EditorHeader from './EditorHeader';
import { push } from 'connected-react-router';
import isEmpty from 'lodash/isEmpty';
// import './../../node_modules/medium-editor/dist/css/medium-editor.min.css';
// import './../../node_modules/medium-editor/dist/css/themes/bootstrap.min.css';
import '../assets/medium.css';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      text: '',
      description: '',
      imgSrc: null,
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.previewImg = this.previewImg.bind(this);
    this.publishStory = this.publishStory.bind(this);
  }

  publishStory() {
    //Empty check
    if (isEmpty(this.state.text) || isEmpty(document.getElementById('editor-title').value)) {
      alert('Please enter some content before Publishing!');
      return;
    }
    this.setState({
      loading: true,
    });
    console.log(this.state);
    console.log('publishing...');
    // const _url = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:5000/api/';
    const _url = 'http://localhost:5000/api/articles';
    const formdata = new FormData();
    formdata.append('text', this.state.text);
    formdata.append('image', this.state.imgSrc);
    formdata.append('title', document.getElementById('editor-title').value);
    formdata.append('author', this.props.user._id);
    formdata.append('description', this.state.description);
    formdata.append('upvotes', 0);
    // console.log('formdata >>', formdata.getAll());
    axios
      .post(_url, formdata)
      .then(res => {
        this.setState({
          loading: false,
        });
        console.log(res.data);
        this.props.push(`/articleview/${res.data._id}`);
        //force refresh
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  handleClick() {
    console.log('clicked');
    this.refs.fileUploader.click();
  }

  previewImg() {
    console.log('preview');
    const file = this.refs.fileUploader.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('image_preview').src = e.target.result;
      this.setState({
        imgSrc: file /*e.target.result*/,
      });
    }.bind(this);
    reader.readAsDataURL(file);
  }

  componentDidMount() {
    const editor = new MediumEditor(/*dom, */ '.medium-editable', {
      autoLink: true,
      delay: 1000,
      targetBlank: true,
      toolbar: {
        buttons: [
          'bold',
          'italic',
          'quote',
          'underline',
          'anchor',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'strikethrough',
          'subscript',
          'superscript',
          'pre',
          'image',
          'html',
          'justifyCenter',
        ],
        diffLeft: 25,
        diffTop: 10,
      },
      anchor: {
        placeholderText: 'Type a link',
        customClassOption: 'btn',
        customClassOptionText: 'Create Button',
      },
      paste: {
        cleanPastedHTML: true,
        cleanAttrs: ['style', 'dir'],
        cleanTags: ['label', 'meta'],
        unwrapTags: ['sub', 'sup'],
      },
      anchorPreview: {
        hideDelay: 300,
      },
      placeholder: {
        text: 'Tell your story...',
      },
      /*
      placeholder: { text: "Tell your Story ...", hideOnClick: true },
      toolbar: {
        buttons: ['bold', 'italic']
      } */
    });
    editor.subscribe('editableInput', (ev, editable) => {
      if (typeof document !== 'undefined')
        this.setState({
          title: document.getElementById('editor-title').value,
          text: editor.getContent(0),
          description: `${editor
            .getContent(0)
            .substring(0, 30)
            .toString()}...`,
        });
      console.log(this.state);
    });
  }

  render() {
    const _initialsArr = this.props.user.name.split(' ');
    const _initials = _initialsArr[0].charAt(0) + _initialsArr[1] ? _initialsArr[1].charAt(0) : '';

    return (
      <div>
        <EditorHeader publish={this.publishStory} loading={this.state.loading} />
        <div className='container-fluid main-container'>
          <div className='row animated fadeInUp' data-animation='fadeInUp-fadeOutDown'>
            <div
              id='main-post'
              className='col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content'
            >
              <div className='post-metadata'>
                <img
                  alt={_initials}
                  className='avatar-image'
                  src={
                    this.props.user.provider_pic
                      ? this.props.user.provider_pic
                      : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown_1-2-48.png'
                  }
                  height='40'
                  width='40'
                />
                <div className='post-info'>
                  <div>
                    <span className='popover-link'>
                      <a href=''>{this.props.user.name}</a>
                    </span>
                  </div>
                  <small>{this.props.user.username}</small>
                </div>
              </div>

              <form className='editor-form main-editor' autocomplete='off'>
                <div
                  className={
                    this.state.imgSrc != null
                      ? 'file-upload-previewer'
                      : 'file-upload-previewer hidden'
                  }
                >
                  <img src='' alt='' id='image_preview' />
                </div>

                <div className='existing-img-previewer' id='existing-img-previewer'></div>

                <div className='form-group'>
                  <span className='picture_upload'>
                    <i className='fa fa-camera' onClick={this.handleClick}></i>
                  </span>
                </div>

                <div className='form-group'>
                  <textarea
                    col='1'
                    className='editor-title'
                    id='editor-title'
                    placeholder='Title'
                  ></textarea>
                </div>

                <div className='form-group'>
                  <textarea id='medium-editable' className='medium-editable'></textarea>
                </div>

                <div class='hidden'>
                  <input
                    type='file'
                    onChange={() => this.previewImg()}
                    id='file'
                    ref='fileUploader'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.authUser.user,
  };
};
export default connect(mapStateToProps, { push })(Editor);
