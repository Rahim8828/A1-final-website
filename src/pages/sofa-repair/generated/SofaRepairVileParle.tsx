import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-vile-parle
 * Keyword: sofa repair vile parle, sofa repair in vile parle
 */
const SofaRepairVileParle: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'vile-parle')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairVileParle;
