import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /faded-sofa-repair-vile-parle
 * Keyword: faded sofa repair vile parle
 */
const FadedSofaRepairVileParle: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'faded')!;
  const location = sofaRepairLocations.find((l) => l.id === 'vile-parle')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default FadedSofaRepairVileParle;
