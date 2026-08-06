import { useState, useEffect } from 'react';
import { sanityReadClient } from '../lib/sanityClient';
import { defaultPagesData } from '../data/pageDefaults';

export function usePageContent(pageId: string) {
  const [pageData, setPageData] = useState(defaultPagesData[pageId] || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    sanityReadClient.fetch('*[_type == "pageContent" && pageId == $pageId][0]', { pageId })
      .then(res => {
        if (isMounted && res && res.content) {
          try {
            const parsed = JSON.parse(res.content);
            setPageData((prev: any) => {
              const combined = { ...prev, ...parsed };
              if (Array.isArray(prev.benefits) && Array.isArray(parsed.benefits)) {
                combined.benefits = prev.benefits.map((defItem: any, idx: number) => parsed.benefits[idx] || defItem);
              }
              if (Array.isArray(prev.perfectFor) && Array.isArray(parsed.perfectFor)) {
                combined.perfectFor = prev.perfectFor.map((defItem: any, idx: number) => parsed.perfectFor[idx] || defItem);
              }
              if (Array.isArray(prev.howItWorksSteps) && Array.isArray(parsed.howItWorksSteps)) {
                combined.howItWorksSteps = prev.howItWorksSteps.map((defItem: any, idx: number) => parsed.howItWorksSteps[idx] || defItem);
              }
              return combined;
            });
          } catch (e) {
            console.error(`Failed to parse page content for ${pageId}`, e);
          }
        }
      })
      .catch(err => console.error(`Error fetching page content for ${pageId}:`, err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [pageId]);

  return { pageData, loading };
}
