/**
 * SEO Gap Pages Routes
 * Uses the generated SEO page registry so new pages automatically
 * participate in routing and sitemap exports.
 */

import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import { allSeoGapPages } from '../data/seoGapPagesData';

const SeoGapPage = lazy(() => import('../pages/seo-gap/SeoGapPage'));

/**
 * All SEO gap page routes
 * Usage in App.tsx: {seoGapRoutes}
 */
export const seoGapRoutes = (
  <>
    {allSeoGapPages.map((page) => (
      <Route
        key={page.key}
        path={page.path}
        element={<SeoGapPage pageData={page.data} />}
      />
    ))}
  </>
);

/**
 * All SEO gap page paths for sitemap generation
 */
export const seoGapPagePaths: string[] = allSeoGapPages.map((page) => page.path);
