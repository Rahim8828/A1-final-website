import React from 'react';
import SofaRepairPageTemplate from '../../components/SofaRepairPageTemplate';
import { sofaRepairProblems } from '../../data/sofaRepairConfig';

/**
 * Problem page: /faded-sofa-repair
 * Keyword: faded sofa repair mumbai, dull sofa restoration
 */
const FadedSofaRepair: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  return <SofaRepairPageTemplate pageType="problem" problem={problem} />;
};

export default FadedSofaRepair;
