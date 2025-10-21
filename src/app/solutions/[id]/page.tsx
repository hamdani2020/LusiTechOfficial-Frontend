import SolutionDetailClient from './SolutionDetailClient';

// Required for static export with dynamic routes
export async function generateStaticParams(): Promise<{ id: string }[]> {
  // For static export, we need to provide at least one path
  // The actual routing will be handled client-side
  return [
    { id: 'gokac' },
    { id: 'greenai' },
    { id: 'medigen' }
  ];
}

// Enable dynamic segments for static export
export const dynamicParams = true;

interface SolutionDetailPageProps {
  params: {
    id: string;
  };
}

export default function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  return <SolutionDetailClient productSlug={params.id} />;
}