import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-powai
 * Keyword: sofa repair powai, sofa repair in powai
 */
const SofaRepairPowai: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'powai')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairPowai;
