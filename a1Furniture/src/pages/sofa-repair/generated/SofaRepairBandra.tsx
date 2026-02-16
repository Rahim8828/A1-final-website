import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-bandra
 * Keyword: sofa repair bandra, sofa repair in bandra
 */
const SofaRepairBandra: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'bandra')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairBandra;
