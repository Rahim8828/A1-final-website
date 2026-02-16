/**
 * SEO Gap Pages Routes
 * 50 high-priority SEO gap pages covering:
 * - "Near me" pages (2)
 * - Location hub pages (10)
 * - "Wooden polishing in {location}" (10)
 * - "Furniture polish in {location}" (10)
 * - "Wood polishing in {location}" (10)
 * - Standalone sofa/bed repair pages (8)
 * 
 * Generated: 2026-02-14
 */

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import {
  furniturePolishNearMeData,
  woodPolishingNearMeData,
  locationHubPages,
  woodenPolishingInPages,
  furniturePolishInPages,
  woodPolishingInPages,
  sofaRepairPages,
  bedRepairPages,
} from '../data/seoGapPagesData';

const SeoGapPage = lazy(() => import('../pages/seo-gap/SeoGapPage'));

/**
 * All 50 SEO gap page routes
 * Usage in App.tsx: {seoGapRoutes}
 */
export const seoGapRoutes = (
  <>
    {/* ========== NEAR ME PAGES (2) ========== */}
    <Route
      path="/furniture-polish-near-me"
      element={<SeoGapPage pageData={furniturePolishNearMeData} />}
    />
    <Route
      path="/wood-polishing-near-me"
      element={<SeoGapPage pageData={woodPolishingNearMeData} />}
    />

    {/* ========== LOCATION HUB PAGES (10) ========== */}
    <Route
      path="/furniture-polish-thane"
      element={<SeoGapPage pageData={locationHubPages.thane} />}
    />
    <Route
      path="/furniture-polish-andheri"
      element={<SeoGapPage pageData={locationHubPages.andheri} />}
    />
    <Route
      path="/furniture-polish-bandra"
      element={<SeoGapPage pageData={locationHubPages.bandra} />}
    />
    <Route
      path="/furniture-polish-malad"
      element={<SeoGapPage pageData={locationHubPages.malad} />}
    />
    <Route
      path="/furniture-polish-mulund"
      element={<SeoGapPage pageData={locationHubPages.mulund} />}
    />
    <Route
      path="/furniture-polish-kandivali"
      element={<SeoGapPage pageData={locationHubPages.kandivali} />}
    />
    <Route
      path="/furniture-polish-borivali"
      element={<SeoGapPage pageData={locationHubPages.borivali} />}
    />
    <Route
      path="/furniture-polish-jogeshwari"
      element={<SeoGapPage pageData={locationHubPages.jogeshwari} />}
    />
    <Route
      path="/furniture-polish-chembur"
      element={<SeoGapPage pageData={locationHubPages.chembur} />}
    />
    <Route
      path="/furniture-polish-vile-parle"
      element={<SeoGapPage pageData={locationHubPages.vileParle} />}
    />

    {/* ========== WOODEN POLISHING IN {LOCATION} (10) ========== */}
    <Route
      path="/wooden-polishing-in-thane"
      element={<SeoGapPage pageData={woodenPolishingInPages.thane} />}
    />
    <Route
      path="/wooden-polishing-in-andheri"
      element={<SeoGapPage pageData={woodenPolishingInPages.andheri} />}
    />
    <Route
      path="/wooden-polishing-in-bandra"
      element={<SeoGapPage pageData={woodenPolishingInPages.bandra} />}
    />
    <Route
      path="/wooden-polishing-in-malad"
      element={<SeoGapPage pageData={woodenPolishingInPages.malad} />}
    />
    <Route
      path="/wooden-polishing-in-goregaon"
      element={<SeoGapPage pageData={woodenPolishingInPages.goregaon} />}
    />
    <Route
      path="/wooden-polishing-in-powai"
      element={<SeoGapPage pageData={woodenPolishingInPages.powai} />}
    />
    <Route
      path="/wooden-polishing-in-dadar"
      element={<SeoGapPage pageData={woodenPolishingInPages.dadar} />}
    />
    <Route
      path="/wooden-polishing-in-mulund"
      element={<SeoGapPage pageData={woodenPolishingInPages.mulund} />}
    />
    <Route
      path="/wooden-polishing-in-borivali"
      element={<SeoGapPage pageData={woodenPolishingInPages.borivali} />}
    />
    <Route
      path="/wooden-polishing-in-kandivali"
      element={<SeoGapPage pageData={woodenPolishingInPages.kandivali} />}
    />

    {/* ========== FURNITURE POLISH IN {LOCATION} (10) ========== */}
    <Route
      path="/furniture-polish-in-thane"
      element={<SeoGapPage pageData={furniturePolishInPages.thane} />}
    />
    <Route
      path="/furniture-polish-in-andheri"
      element={<SeoGapPage pageData={furniturePolishInPages.andheri} />}
    />
    <Route
      path="/furniture-polish-in-bandra"
      element={<SeoGapPage pageData={furniturePolishInPages.bandra} />}
    />
    <Route
      path="/furniture-polish-in-malad"
      element={<SeoGapPage pageData={furniturePolishInPages.malad} />}
    />
    <Route
      path="/furniture-polish-in-mulund"
      element={<SeoGapPage pageData={furniturePolishInPages.mulund} />}
    />
    <Route
      path="/furniture-polish-in-jogeshwari"
      element={<SeoGapPage pageData={furniturePolishInPages.jogeshwari} />}
    />
    <Route
      path="/furniture-polish-in-chembur"
      element={<SeoGapPage pageData={furniturePolishInPages.chembur} />}
    />
    <Route
      path="/furniture-polish-in-khar"
      element={<SeoGapPage pageData={furniturePolishInPages.khar} />}
    />
    <Route
      path="/furniture-polish-in-juhu"
      element={<SeoGapPage pageData={furniturePolishInPages.juhu} />}
    />
    <Route
      path="/furniture-polish-in-vashi"
      element={<SeoGapPage pageData={furniturePolishInPages.vashi} />}
    />

    {/* ========== WOOD POLISHING IN {LOCATION} (10) ========== */}
    <Route
      path="/wood-polishing-in-thane"
      element={<SeoGapPage pageData={woodPolishingInPages.thane} />}
    />
    <Route
      path="/wood-polishing-in-andheri"
      element={<SeoGapPage pageData={woodPolishingInPages.andheri} />}
    />
    <Route
      path="/wood-polishing-in-bandra"
      element={<SeoGapPage pageData={woodPolishingInPages.bandra} />}
    />
    <Route
      path="/wood-polishing-in-malad"
      element={<SeoGapPage pageData={woodPolishingInPages.malad} />}
    />
    <Route
      path="/wood-polishing-in-goregaon"
      element={<SeoGapPage pageData={woodPolishingInPages.goregaon} />}
    />
    <Route
      path="/wood-polishing-in-dadar"
      element={<SeoGapPage pageData={woodPolishingInPages.dadar} />}
    />
    <Route
      path="/wood-polishing-in-mulund"
      element={<SeoGapPage pageData={woodPolishingInPages.mulund} />}
    />
    <Route
      path="/wood-polishing-in-borivali"
      element={<SeoGapPage pageData={woodPolishingInPages.borivali} />}
    />
    <Route
      path="/wood-polishing-in-kandivali"
      element={<SeoGapPage pageData={woodPolishingInPages.kandivali} />}
    />
    <Route
      path="/wood-polishing-in-powai"
      element={<SeoGapPage pageData={woodPolishingInPages.powai} />}
    />

    {/* ========== SOFA REPAIR STANDALONE (4) ========== */}
    <Route
      path="/sofa-repair-in-thane"
      element={<SeoGapPage pageData={sofaRepairPages.thane} />}
    />
    <Route
      path="/sofa-repair-in-mulund"
      element={<SeoGapPage pageData={sofaRepairPages.mulund} />}
    />
    <Route
      path="/sofa-repair-in-dadar"
      element={<SeoGapPage pageData={sofaRepairPages.dadar} />}
    />
    <Route
      path="/sofa-repair-in-bandra"
      element={<SeoGapPage pageData={sofaRepairPages.bandra} />}
    />

    {/* ========== BED REPAIR STANDALONE (4) ========== */}
    <Route
      path="/bed-repair-in-thane"
      element={<SeoGapPage pageData={bedRepairPages.thane} />}
    />
    <Route
      path="/bed-repair-in-mulund"
      element={<SeoGapPage pageData={bedRepairPages.mulund} />}
    />
    <Route
      path="/bed-repair-in-dadar"
      element={<SeoGapPage pageData={bedRepairPages.dadar} />}
    />
    <Route
      path="/bed-repair-in-bandra"
      element={<SeoGapPage pageData={bedRepairPages.bandra} />}
    />
  </>
);

/**
 * All SEO gap page paths for sitemap generation
 */
export const seoGapPagePaths: string[] = [
  // Near Me (2)
  '/furniture-polish-near-me',
  '/wood-polishing-near-me',
  // Location Hubs (10)
  '/furniture-polish-thane',
  '/furniture-polish-andheri',
  '/furniture-polish-bandra',
  '/furniture-polish-malad',
  '/furniture-polish-mulund',
  '/furniture-polish-kandivali',
  '/furniture-polish-borivali',
  '/furniture-polish-jogeshwari',
  '/furniture-polish-chembur',
  '/furniture-polish-vile-parle',
  // Wooden Polishing In (10)
  '/wooden-polishing-in-thane',
  '/wooden-polishing-in-andheri',
  '/wooden-polishing-in-bandra',
  '/wooden-polishing-in-malad',
  '/wooden-polishing-in-goregaon',
  '/wooden-polishing-in-powai',
  '/wooden-polishing-in-dadar',
  '/wooden-polishing-in-mulund',
  '/wooden-polishing-in-borivali',
  '/wooden-polishing-in-kandivali',
  // Furniture Polish In (10)
  '/furniture-polish-in-thane',
  '/furniture-polish-in-andheri',
  '/furniture-polish-in-bandra',
  '/furniture-polish-in-malad',
  '/furniture-polish-in-mulund',
  '/furniture-polish-in-jogeshwari',
  '/furniture-polish-in-chembur',
  '/furniture-polish-in-khar',
  '/furniture-polish-in-juhu',
  '/furniture-polish-in-vashi',
  // Wood Polishing In (10)
  '/wood-polishing-in-thane',
  '/wood-polishing-in-andheri',
  '/wood-polishing-in-bandra',
  '/wood-polishing-in-malad',
  '/wood-polishing-in-goregaon',
  '/wood-polishing-in-dadar',
  '/wood-polishing-in-mulund',
  '/wood-polishing-in-borivali',
  '/wood-polishing-in-kandivali',
  '/wood-polishing-in-powai',
  // Sofa Repair (4)
  '/sofa-repair-in-thane',
  '/sofa-repair-in-mulund',
  '/sofa-repair-in-dadar',
  '/sofa-repair-in-bandra',
  // Bed Repair (4)
  '/bed-repair-in-thane',
  '/bed-repair-in-mulund',
  '/bed-repair-in-dadar',
  '/bed-repair-in-bandra',
];
