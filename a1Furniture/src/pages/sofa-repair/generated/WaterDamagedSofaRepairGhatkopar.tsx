import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /water-damaged-sofa-repair-ghatkopar
 * Keyword: water damaged sofa repair ghatkopar
 */
const WaterDamagedSofaRepairGhatkopar: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = sofaRepairLocations.find((l) => l.id === 'ghatkopar')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedSofaRepairGhatkopar;
