import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-matunga
 * Keyword: sofa repair matunga, sofa repair in matunga
 */
const SofaRepairMatunga: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'matunga')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairMatunga;
