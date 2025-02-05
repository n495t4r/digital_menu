import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbs } from './BreadcrumbUtils'; // Adjust import path

const Breadcrumbs = ({ header }) => {
  const { url } = usePage();

  // Generate breadcrumbs using utility function
  const segments = generateBreadcrumbs(url, header);

  // Ensure segments is an array and filter out any empty or null segments
  const validSegments = segments?.filter(seg => seg && seg.label) || [];

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {validSegments.map((segment, index) => (
        <React.Fragment key={segment.href || segment.label}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          
          {segment.href ? (
            url === segment.href ? (
              <span className="font-semibold text-gray-900">
                {segment.label}
              </span>
            ) : (
              <Link 
                href={segment.href} 
                preserveState
                preserveScroll
                className="hover:text-gray-700 transition-colors"
              >
                {segment.label}
              </Link>
            )
          ) : (
            <span className={index === validSegments.length - 1 ? 'font-semibold text-gray-900' : ''}>
              {segment.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;