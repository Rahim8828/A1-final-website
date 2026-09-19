import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-vashi
 * Keyword: sofa repair vashi, sofa repair in vashi
 */
const SofaRepairVashi: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'vashi')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairVashi;
