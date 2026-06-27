import type { Metadata } from 'next';
import TrackOrderClient from './TrackOrderClient';

export const metadata: Metadata = {
  title: 'Track Your Order | Parhae Likhae',
  description: 'Enter your order ID or phone number to track the current status of your Parhae Likhae order.',
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
