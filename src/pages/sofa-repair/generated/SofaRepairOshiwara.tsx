import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-oshiwara
 * Keyword: sofa repair oshiwara, sofa repair in oshiwara
 */
const SofaRepairOshiwara: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'oshiwara')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairOshiwara;
