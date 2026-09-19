import React from 'react';
import SofaRepairPageTemplate from '../../components/SofaRepairPageTemplate';
import { sofaRepairProblems } from '../../data/sofaRepairConfig';

/**
 * Problem page: /termite-damaged-sofa-repair
 * Keyword: termite damaged sofa repair mumbai, termite sofa treatment
 */
const TermiteDamagedSofaRepair: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'termite')!;
  return <SofaRepairPageTemplate pageType="problem" problem={problem} />;
};

export default TermiteDamagedSofaRepair;
