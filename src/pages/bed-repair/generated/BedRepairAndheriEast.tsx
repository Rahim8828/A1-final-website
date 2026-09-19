import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-andheri-east
 * Keyword: bed repair andheri east, bed repair in andheri east
 */
const BedRepairAndheriEast: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'andheri-east')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairAndheriEast;
