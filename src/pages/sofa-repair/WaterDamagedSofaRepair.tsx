import React from 'react';
import SofaRepairPageTemplate from '../../components/SofaRepairPageTemplate';
import { sofaRepairProblems } from '../../data/sofaRepairConfig';

/**
 * Problem page: /water-damaged-sofa-repair
 * Keyword: water damaged sofa repair mumbai, moisture affected sofa
 */
const WaterDamagedSofaRepair: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  return <SofaRepairPageTemplate pageType="problem" problem={problem} />;
};

export default WaterDamagedSofaRepair;
