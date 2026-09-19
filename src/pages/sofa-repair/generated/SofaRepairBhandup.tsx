import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-bhandup
 * Keyword: sofa repair bhandup, sofa repair in bhandup
 */
const SofaRepairBhandup: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'bhandup')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairBhandup;
