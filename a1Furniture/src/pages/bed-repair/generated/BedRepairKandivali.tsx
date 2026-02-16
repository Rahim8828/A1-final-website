import React from 'react';
import BedRepairPageTemplate from '../../../components/BedRepairPageTemplate';
import { bedRepairLocations } from '../../../data/bedRepairConfig';

/**
 * Location page: /bed-repair-kandivali
 * Keyword: bed repair kandivali, bed repair in kandivali
 */
const BedRepairKandivali: React.FC = () => {
  const location = bedRepairLocations.find((l) => l.id === 'kandivali')!;
  return <BedRepairPageTemplate pageType="location" location={location} />;
};

export default BedRepairKandivali;
