import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-mira-road
 * Keyword: sofa repair mira road, sofa repair in mira road
 */
const SofaRepairMiraRoad: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'mira-road')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairMiraRoad;
