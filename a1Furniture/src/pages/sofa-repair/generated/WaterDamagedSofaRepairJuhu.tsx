import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /water-damaged-sofa-repair-juhu
 * Keyword: water damaged sofa repair juhu
 */
const WaterDamagedSofaRepairJuhu: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = sofaRepairLocations.find((l) => l.id === 'juhu')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedSofaRepairJuhu;
