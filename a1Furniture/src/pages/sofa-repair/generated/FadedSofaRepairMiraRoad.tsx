import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /faded-sofa-repair-mira-road
 * Keyword: faded sofa repair mira road
 */
const FadedSofaRepairMiraRoad: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  const location = sofaRepairLocations.find((l) => l.id === 'mira-road')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedSofaRepairMiraRoad;
