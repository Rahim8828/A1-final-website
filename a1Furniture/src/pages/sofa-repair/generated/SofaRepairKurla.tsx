import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-kurla
 * Keyword: sofa repair kurla, sofa repair in kurla
 */
const SofaRepairKurla: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'kurla')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairKurla;
