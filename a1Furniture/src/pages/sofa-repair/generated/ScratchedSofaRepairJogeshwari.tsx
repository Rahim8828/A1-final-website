import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /scratched-sofa-repair-jogeshwari
 * Keyword: scratched sofa repair jogeshwari
 */
const ScratchedSofaRepairJogeshwari: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'scratched')!;
  const location = sofaRepairLocations.find((l) => l.id === 'jogeshwari')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedSofaRepairJogeshwari;
