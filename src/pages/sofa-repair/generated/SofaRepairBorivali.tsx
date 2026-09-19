import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-borivali
 * Keyword: sofa repair borivali, sofa repair in borivali
 */
const SofaRepairBorivali: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'borivali')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairBorivali;
