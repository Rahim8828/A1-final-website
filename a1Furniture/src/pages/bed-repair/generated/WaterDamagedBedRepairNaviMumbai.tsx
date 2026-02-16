import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /water-damaged-bed-repair-navi-mumbai
 * Keyword: water damaged bed repair navi mumbai
 */
const WaterDamagedBedRepairNaviMumbai: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = bedRepairLocations.find((l) => l.id === 'navi-mumbai')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedBedRepairNaviMumbai;
