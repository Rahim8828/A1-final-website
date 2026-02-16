import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /water-damaged-sofa-repair-matunga
 * Keyword: water damaged sofa repair matunga
 */
const WaterDamagedSofaRepairMatunga: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = sofaRepairLocations.find((l) => l.id === 'matunga')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedSofaRepairMatunga;
