import BlogPostClient from './BlogPostClient';

// Required for static export with dynamic routes
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // For static export, we need to provide at least one path
  // The actual routing will be handled client-side
  return [
    { slug: 'example-post' }
  ];
}

// Enable dynamic segments for static export
export const dynamicParams = true;

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClient slug={params.slug} />;
}