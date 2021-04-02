import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import P from "../P";
import Row from "../Row";
import Label from "../Label";

// import Button from 'components/Button';
// import Label from 'components/Label';
// import InputSpacer from 'components/InputSpacer';

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = event => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

class UploadFileForm extends Component {
  state = {
    source: 'url',
    file: null,
    type: null,
    options: {
      filename: null
    },
    isDragging: false
  };

  onChangeImportFile = file => {
    file &&
    this.setState({
      file,
      type: file.type,
      options: {...this.state.options, filename: file.name}
    });
  };

  handleDragEnter = () => this.setState({isDragging: true}); // <---
  handleDragLeave = () => this.setState({isDragging: false}); // <---
  handleDrop = e => { // <---
    e.preventDefault();
    this.setState({isDragging: false});
    const file = e.dataTransfer.files[0];
    console.log(file);
    this.onChangeImportFile(file);
  };


  render() {
    return (
      <div className={"col-12"}>
        <Row className={"row"}>
          <Label
            isDragging={this.state.isDragging}
            onDrop={this.handleDrop}
            onDragEnter={this.handleDragEnter}
            onDragOver={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 104.40317 83.13328"
            >
              <g>
                <rect
                  x="5.02914"
                  y="8.63138"
                  width="77.33334"
                  height="62.29167"
                  rx="4"
                  ry="4"
                  transform="translate(-7.45722 9.32921) rotate(-12)"
                  fill="#fafafb"
                />
                <rect
                  x="5.52914"
                  y="9.13138"
                  width="76.33334"
                  height="61.29167"
                  rx="4"
                  ry="4"
                  transform="translate(-7.45722 9.32921) rotate(-12)"
                  fill="none"
                  stroke="#979797"
                />

                <rect
                  x="26.56627"
                  y="4.48824"
                  width="62.29167"
                  height="77.33333"
                  rx="4"
                  ry="4"
                  transform="translate(0.94874 87.10632) rotate(-75)"
                  fill="#fafafb"
                />
                <rect
                  x="27.06627"
                  y="4.98824"
                  width="61.29167"
                  height="76.33333"
                  rx="4"
                  ry="4"
                  transform="translate(0.94874 87.10632) rotate(-75)"
                  fill="none"
                  stroke="#979797"
                />

              </g>
            </svg>
            <P>
              <span>
                Drag & drop your file into this area or
                <span className={"underline"}>browse</span> for a file to upload
              </span>
            </P>
            <div onDragLeave={this.handleDragLeave} className="isDragging"/>
            <input
              name="file_input"
              accept=".csv"
              onChange={({target: {files}}) =>
                files && this.onChangeImportFile(files[0])
              }
              type="file"
            />
          </Label>
        </Row>
      </div>
    );
  }
}

UploadFileForm.propTypes = {
};

export default UploadFileForm;
