import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-chembur
 * Keyword: sofa repair chembur, sofa repair in chembur
 */
const SofaRepairChembur: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'chembur')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairChembur;
