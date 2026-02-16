import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-thane
 * Keyword: sofa repair thane, sofa repair in thane
 */
const SofaRepairThane: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'thane')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairThane;
