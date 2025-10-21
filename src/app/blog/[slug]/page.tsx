import BlogPostClient from './BlogPostClient';

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Return empty array - we'll handle routing client-side
  // since blog posts come from external API
  return [];
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostClient slug={params.slug} />;
}