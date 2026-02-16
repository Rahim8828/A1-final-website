import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /faded-sofa-repair-dahisar
 * Keyword: faded sofa repair dahisar
 */
const FadedSofaRepairDahisar: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  const location = sofaRepairLocations.find((l) => l.id === 'dahisar')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedSofaRepairDahisar;
