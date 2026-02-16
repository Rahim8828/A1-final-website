import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /water-damaged-bed-repair-kandivali
 * Keyword: water damaged bed repair kandivali
 */
const WaterDamagedBedRepairKandivali: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'water-damaged')!;
  const location = bedRepairLocations.find((l) => l.id === 'kandivali')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default WaterDamagedBedRepairKandivali;
