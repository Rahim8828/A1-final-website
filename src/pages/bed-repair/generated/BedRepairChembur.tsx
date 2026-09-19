import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-chembur
 * Keyword: bed repair chembur, bed repair in chembur
 */
const BedRepairChembur: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'chembur')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairChembur;
