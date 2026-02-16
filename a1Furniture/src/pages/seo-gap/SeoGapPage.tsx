/**
 * SEO Gap Page Component
 * Renders a ServicePageTemplate for any SEO gap page using data from seoGapPagesData.ts
 * 
 * This single component handles all 50 SEO gap pages by accepting pageData as a prop.
 */

import React from 'react';
import ServicePageTemplate from '../../components/ServicePageTemplate';
import { PageData } from '../../types';

interface SeoGapPageProps {
  pageData: PageData;
}

const SeoGapPage: React.FC<SeoGapPageProps> = ({ pageData }) => {
  return <ServicePageTemplate pageData={pageData} />;
};

export default SeoGapPage;
