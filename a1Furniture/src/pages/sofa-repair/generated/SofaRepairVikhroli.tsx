import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-vikhroli
 * Keyword: sofa repair vikhroli, sofa repair in vikhroli
 */
const SofaRepairVikhroli: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'vikhroli')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairVikhroli;
