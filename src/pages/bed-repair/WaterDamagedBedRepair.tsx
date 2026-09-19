import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedRepairProblems } from '../../data/bedRepairConfig';

/**
 * Problem page: /water-damaged-bed-repair
 * Keyword: water damaged bed repair mumbai
 */
const WaterDamagedBedRepair: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'water-damaged')!;
  return <BedRepairPageTemplate pageType="problem" problem={problem} />;
};

export default WaterDamagedBedRepair;
