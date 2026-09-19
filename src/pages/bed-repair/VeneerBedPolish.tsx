import React from 'react';
import BedRepairPageTemplate from '../../components/BedRepairPageTemplate';
import { bedWoodTypes } from '../../data/bedRepairConfig';

/**
 * Wood type page: /veneer-bed-polish
 * Keyword: veneer bed polish mumbai
 */
const VeneerBedPolish: React.FC = () => {
  const woodType = bedWoodTypes.find((w) => w.id === 'veneer')!;
  return <BedRepairPageTemplate pageType="wood-type" woodType={woodType} />;
};

export default VeneerBedPolish;
