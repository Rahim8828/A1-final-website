import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /water-damaged-sofa-repair-mulund
 * Keyword: water damaged sofa repair mulund
 */
const WaterDamagedSofaRepairMulund: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = sofaRepairLocations.find((l) => l.id === 'mulund')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedSofaRepairMulund;
