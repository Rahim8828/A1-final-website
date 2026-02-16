import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /scratched-sofa-repair-thane
 * Keyword: scratched sofa repair thane
 */
const ScratchedSofaRepairThane: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'scratched')!;
  const location = sofaRepairLocations.find((l) => l.id === 'thane')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedSofaRepairThane;
