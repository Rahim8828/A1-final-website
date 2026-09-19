import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-andheri-west
 * Keyword: bed repair andheri west, bed repair in andheri west
 */
const BedRepairAndheriWest: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'andheri-west')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairAndheriWest;
