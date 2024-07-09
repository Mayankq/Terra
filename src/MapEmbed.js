import React from 'react';

const MapEmbed = ({ latitude, longitude }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12621.08418475012!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1614039075798!5m2!1sen!2sus`;

  return (
    <div>
      <iframe
        width="600"
        height="450"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
