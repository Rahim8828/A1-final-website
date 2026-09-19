import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-santacruz
 * Keyword: sofa repair santacruz, sofa repair in santacruz
 */
const SofaRepairSantacruz: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'santacruz')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairSantacruz;
