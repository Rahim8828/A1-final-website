import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /water-damaged-bed-repair-kurla
 * Keyword: water damaged bed repair kurla
 */
const WaterDamagedBedRepairKurla: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = bedRepairLocations.find((l) => l.id === 'kurla')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedBedRepairKurla;
