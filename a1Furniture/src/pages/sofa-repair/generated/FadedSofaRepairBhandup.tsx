import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /faded-sofa-repair-bhandup
 * Keyword: faded sofa repair bhandup
 */
const FadedSofaRepairBhandup: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  const location = sofaRepairLocations.find((l) => l.id === 'bhandup')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedSofaRepairBhandup;
