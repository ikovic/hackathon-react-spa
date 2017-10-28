import React from 'react';

export default class PreviewFrame extends React.PureComponent {
  render() {
    const preview = this.props.preview;

    return preview ? (
      <div
        className="iframeWrapper"
        dangerouslySetInnerHTML={preview}
        ref={previewIframe => (this.previewIframe = previewIframe)}
      />
    ) : null;
  }
}
