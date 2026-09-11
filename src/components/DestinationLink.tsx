import type { ComponentProps } from 'react';

// Page navigation stays here; external sites and source documents open separately.
export function DestinationLink(props: ComponentProps<'a'>) {
  const separateTab = /^(https?:|mailto:)/.test(props.href ?? '')
    || /\.(pdf|webp|png|jpe?g)(?:[?#]|$)/i.test(props.href ?? '');
  return <a {...props} {...(separateTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})} />;
}
