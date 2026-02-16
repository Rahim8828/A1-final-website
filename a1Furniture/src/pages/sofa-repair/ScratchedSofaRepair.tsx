import React from 'react';
import SofaRepairPageTemplate from '../../components/SofaRepairPageTemplate';
import { sofaRepairProblems } from '../../data/sofaRepairConfig';

/**
 * Problem page: /scratched-sofa-repair
 * Keyword: scratched sofa repair mumbai
 */
const ScratchedSofaRepair: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'scratched')!;
  return <SofaRepairPageTemplate pageType="problem" problem={problem} />;
};

export default ScratchedSofaRepair;
