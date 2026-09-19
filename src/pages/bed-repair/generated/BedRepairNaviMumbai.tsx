import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-navi-mumbai
 * Keyword: bed repair navi mumbai, bed repair in navi mumbai
 */
const BedRepairNaviMumbai: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'navi-mumbai')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairNaviMumbai;
