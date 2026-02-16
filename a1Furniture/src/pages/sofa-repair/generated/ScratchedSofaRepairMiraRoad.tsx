import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /scratched-sofa-repair-mira-road
 * Keyword: scratched sofa repair mira road
 */
const ScratchedSofaRepairMiraRoad: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'scratched')!;
  const location = sofaRepairLocations.find((l) => l.id === 'mira-road')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedSofaRepairMiraRoad;
