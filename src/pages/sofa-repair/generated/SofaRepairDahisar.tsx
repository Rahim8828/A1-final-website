import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-dahisar
 * Keyword: sofa repair dahisar, sofa repair in dahisar
 */
const SofaRepairDahisar: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'dahisar')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairDahisar;
