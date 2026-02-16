import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-powai
 * Keyword: bed repair powai, bed repair in powai
 */
const BedRepairPowai: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'powai')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairPowai;
