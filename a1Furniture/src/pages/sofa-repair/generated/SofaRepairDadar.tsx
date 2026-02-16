import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-dadar
 * Keyword: sofa repair dadar, sofa repair in dadar
 */
const SofaRepairDadar: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'dadar')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairDadar;
