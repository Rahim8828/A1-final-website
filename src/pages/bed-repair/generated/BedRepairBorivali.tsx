import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-borivali
 * Keyword: bed repair borivali, bed repair in borivali
 */
const BedRepairBorivali: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'borivali')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairBorivali;
