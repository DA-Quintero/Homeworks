import React from 'react';

import PropTypes from 'prop-types';

function Image({ id, title }) {
  const url = `https://picsum.photos/id/${id}/200/300`;
  return (
    <div className="image-card">
      <img src={url} alt={title} className="image" />
      <div className="image-title">{title}</div>
      <div className="image-id">ID: {id}</div>
    </div>
  );
}

Image.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;
