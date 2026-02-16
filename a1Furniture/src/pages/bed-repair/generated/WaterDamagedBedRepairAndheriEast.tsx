import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /water-damaged-bed-repair-andheri-east
 * Keyword: water damaged bed repair andheri east
 */
const WaterDamagedBedRepairAndheriEast: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = bedRepairLocations.find((l) => l.id === 'andheri-east')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedBedRepairAndheriEast;
