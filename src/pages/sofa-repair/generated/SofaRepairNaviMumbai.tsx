import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-navi-mumbai
 * Keyword: sofa repair navi mumbai, sofa repair in navi mumbai
 */
const SofaRepairNaviMumbai: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'navi-mumbai')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairNaviMumbai;
