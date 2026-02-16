import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairProblems, bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location+Problem page: /scratched-bed-repair-kandivali
 * Keyword: scratched bed repair kandivali
 */
const ScratchedBedRepairKandivali: React.FC = () => {
  const problem = bedRepairProblems.find((p) => p.id === 'scratched')!;
  const location = bedRepairLocations.find((l) => l.id === 'kandivali')!;
  return <BedRepairPageTemplate pageType="location-problem" problem={problem} location={location} />;
};

export default ScratchedBedRepairKandivali;
