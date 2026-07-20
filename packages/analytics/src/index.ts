/**
 * Minimal, privacy-conscious analytics facade. Emits typed events to a sink.
 * The MVP sink just logs; swap for a real pipeline later. No PII in event props.
 */

export type AnalyticsEvent =
  | { name: 'listing_view'; props: { listingId: string; kind: string } }
  | { name: 'listing_lead'; props: { listingId: string } }
  | { name: 'search'; props: { islandCode?: string; kind?: string; results: number } }
  | { name: 'professional_view'; props: { professionalId: string } }
  | { name: 'job_posted'; props: { categoryKey?: string } }
  | { name: 'quote_submitted'; props: { jobId: string } }
  | { name: 'review_submitted'; props: { professionalId: string; verified: boolean } }
  | { name: 'procedure_view'; props: { procedureSlug: string } };

export interface AnalyticsSink {
  track(event: AnalyticsEvent, context?: { locale?: string }): void | Promise<void>;
}

export const consoleSink: AnalyticsSink = {
  track(event, context) {
    // eslint-disable-next-line no-console
    console.info('[analytics]', event.name, { ...event.props, ...context });
  },
};

let sink: AnalyticsSink = consoleSink;
export function configureAnalytics(next: AnalyticsSink): void {
  sink = next;
}
export function track(event: AnalyticsEvent, context?: { locale?: string }): void | Promise<void> {
  return sink.track(event, context);
}
