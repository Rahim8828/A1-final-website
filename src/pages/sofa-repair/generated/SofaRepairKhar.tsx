import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-khar
 * Keyword: sofa repair khar, sofa repair in khar
 */
const SofaRepairKhar: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'khar')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairKhar;
