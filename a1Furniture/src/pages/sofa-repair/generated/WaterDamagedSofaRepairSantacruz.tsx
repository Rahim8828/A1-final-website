import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /water-damaged-sofa-repair-santacruz
 * Keyword: water damaged sofa repair santacruz
 */
const WaterDamagedSofaRepairSantacruz: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = sofaRepairLocations.find((l) => l.id === 'santacruz')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedSofaRepairSantacruz;
