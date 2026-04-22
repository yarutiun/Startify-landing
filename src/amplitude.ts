'use client';

import * as amplitude from '@amplitude/unified';

function initAmplitude() {
  if (typeof window !== 'undefined') {
    amplitude.initAll('5e6716b750014d2e8a43ab6d07a7ea89', {"serverZone":"EU","analytics":{"autocapture":true},"sessionReplay":{"sampleRate":1}});
  }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
