
import React from 'react';

interface JsonLdProps {
  data?: object;
  schema?: object;
}

const JsonLd: React.FC<JsonLdProps> = ({ data, schema }) => {
  const content = schema || data;
  if (!content) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(content) }}
    />
  );
};

export default JsonLd;
