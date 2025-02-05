export const generateBreadcrumbs = (url, header = null) => {
    const pathSegments = url.split('/').filter(Boolean);
    
    // Specific route handling for establishments
    if (pathSegments[0] === 'establishments') {
      const baseCrumbs = [
        { label: 'Dashboard', href: '/dashboard' },
        // { label: 'Establishment', 
        //     href: pathSegments.length > 2 ? 
        //         `/establishments/${pathSegments[1]}` : 
        //         url 
        // }
      ];
  
      if (pathSegments.length > 1) {
        baseCrumbs.push(
            { label: 'Establishment', 
                href: pathSegments.length > 2 ? 
                    `/establishments/${pathSegments[1]}` : 
                    url 
            },    
        { 
          label:  (
            // pathSegments.length === 2 ? 'View Establishment' : 
            pathSegments[2] === 'edit' ? 'Edit Establishment' :
            pathSegments[2] === 'menu' ? 'Menu' : 
            ''
          )
        });
  
        // Add additional crumb for edit/menu
        // if (pathSegments.length > 2) {
        //   baseCrumbs.push({ 
        //     label: header || (
        //       pathSegments[2] === 'edit' ? 'Edit' :
        //       pathSegments[2] === 'menu' ? 'Menu' : 
        //       pathSegments[2]
        //     ),
        //     href: url 
        //   });
        // }
  
        return baseCrumbs;
      }
    }
  
    // Default breadcrumb generation
    return [
      ...pathSegments.map((segment, index) => ({
        label: header || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: `/${pathSegments.slice(0, index + 1).join('/')}`
      }))
    ];
  };