import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-bandra
 * Keyword: bed repair bandra, bed repair in bandra
 */
const BedRepairBandra: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'bandra')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairBandra;
