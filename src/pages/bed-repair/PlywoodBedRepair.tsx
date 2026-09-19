import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /plywood-bed-repair
 * Keyword: plywood bed repair mumbai
 */
const PlywoodBedRepair: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'plywood')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default PlywoodBedRepair;
