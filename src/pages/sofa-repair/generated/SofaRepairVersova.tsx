import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-versova
 * Keyword: sofa repair versova, sofa repair in versova
 */
const SofaRepairVersova: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'versova')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairVersova;
