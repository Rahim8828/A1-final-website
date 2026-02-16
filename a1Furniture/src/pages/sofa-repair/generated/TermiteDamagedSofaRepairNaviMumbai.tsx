import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairProblems, sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location+Problem page: /termite-damaged-sofa-repair-navi-mumbai
 * Keyword: termite damaged sofa repair navi mumbai
 */
const TermiteDamagedSofaRepairNaviMumbai: React.FC = () => {
  const problem = sofaRepairProblems.find((p) => p.id === 'termite')!;
  const location = sofaRepairLocations.find((l) => l.id === 'navi-mumbai')!;
  return <SofaRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedSofaRepairNaviMumbai;
