import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /faded-sofa-repair-andheri-east
 * Keyword: faded sofa repair andheri east
 */
const FadedSofaRepairAndheriEast: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  const location = sofaRepairLocations.find((l) => l.id === 'andheri-east')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedSofaRepairAndheriEast;
