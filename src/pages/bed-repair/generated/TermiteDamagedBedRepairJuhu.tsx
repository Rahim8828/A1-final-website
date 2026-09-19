import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /termite-damaged-bed-repair-juhu
 * Keyword: termite damaged bed repair juhu
 */
const TermiteDamagedBedRepairJuhu: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'termite')!;
  const location = bedRepairLocations.find((l) => l.id === 'juhu')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default TermiteDamagedBedRepairJuhu;
