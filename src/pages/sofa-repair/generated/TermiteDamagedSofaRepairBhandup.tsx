import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /termite-damaged-sofa-repair-bhandup
 * Keyword: termite damaged sofa repair bhandup
 */
const TermiteDamagedSofaRepairBhandup: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'termite')!;
  const location = sofaRepairLocations.find((l) => l.id === 'bhandup')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedSofaRepairBhandup;
