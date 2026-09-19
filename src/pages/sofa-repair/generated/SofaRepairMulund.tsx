import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-mulund
 * Keyword: sofa repair mulund, sofa repair in mulund
 */
const SofaRepairMulund: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'mulund')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairMulund;
