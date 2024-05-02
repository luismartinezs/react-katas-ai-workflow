// lib/seo.js

import { Metadata } from "next";

// Configure these values based on your app's information
const config = {
  appName: "React Katas AI Maker",
  appDescription:
    "React Katas AI Maker is an innovative tool that leverages artificial intelligence to generate custom React coding exercises. Perfect for developers looking to enhance their skills, this app provides personalized katas based on the latest React documentation. Accelerate your learning and stay ahead with React Katas AI Maker!",
  domainName: "https://reactkatasaimaker.webdevluis.com/",
};

export function getSEOTags({
  title,
  description = config.appDescription,
  canonicalUrlRelative,
  imageUrl,
}: {
  title?: string;
  description?: string;
  canonicalUrlRelative: string;
  imageUrl?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${config.appName}` : config.appName;
  const canonicalUrl = config.domainName + canonicalUrlRelative;

  const ogTags: Record<string, string> = {
    url: canonicalUrl,
    title: fullTitle,
    description: description,
    type: "website",
    site_name: config.appName,
  }

  const twitterTags: Record<string, string> = {
      card: "summary_large_image",
      site: "@shipfast",
      creator: "@webdevluis",
      title: fullTitle,
      description: description,
  }

  if (imageUrl) {
    ogTags.image = imageUrl;
    twitterTags.image = imageUrl;
  }


  const seoTags: Record<string, string|Record<string, string> > = {
    title: fullTitle,
    description: description,
    canonicalUrl: canonicalUrl,
    openGraph: ogTags,
    // twitter: twitterTags,
  }

  return seoTags;
}

// This function can be further customized to add more structured data
export function renderSchemaTags() {
  const schema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: config.appName,
    description: config.appDescription,
    url: config.domainName,
    // Add additional structured data properties here
  };

  // Use 'dangerouslySetInnerHTML' to prevent React from escaping the JSON string
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
