import React from 'react';
import ServicePageTemplate from '../components/ServicePageTemplate';
import { samplePageData } from '../data/samplePageData';

/**
 * Test page to verify ServicePageTemplate component
 * This page uses sample data to render the template
 */
const TestServicePage: React.FC = () => {
  return <ServicePageTemplate pageData={pageData} />;
};

export default TestServicePage;
