import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-andheri-west
 * Keyword: sofa repair andheri west, sofa repair in andheri west
 */
const SofaRepairAndheriWest: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'andheri-west')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairAndheriWest;
