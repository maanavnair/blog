import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange, readOnly }) => {
  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         
  ];

  const modules = {
    toolbar: readOnly ? null : toolbarOptions,
  }

  return (
    <div className='editor-div'>
      <ReactQuill 
        className='editor'
        theme="snow" value={value} 
        onChange={onChange} 
        modules={ modules } 
        readOnly = {readOnly} 
      />
    </div>
  );
};

export default Editor;