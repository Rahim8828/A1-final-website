import React from 'react';
import SofaRepairPageTemplate from '../../../components/SofaRepairPageTemplate';
import { sofaRepairLocations } from '../../../data/sofaRepairConfig';

/**
 * Location page: /sofa-repair-ghatkopar
 * Keyword: sofa repair ghatkopar, sofa repair in ghatkopar
 */
const SofaRepairGhatkopar: React.FC = () => {
  const location = sofaRepairLocations.find((l) => l.id === 'ghatkopar')!;
  return <SofaRepairPageTemplate pageType="location" location={location} />;
};

export default SofaRepairGhatkopar;
