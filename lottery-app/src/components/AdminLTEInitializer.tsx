
'use client'

import { useEffect } from 'react';

const AdminLTEInitializer = () => {
  useEffect(() => {
    // Dynamically import jQuery and make it globally available
    import('jquery').then(($) => {
      // @ts-ignore
      window.jQuery = $;
      // @ts-ignore
      window.$ = $;

      // Dynamically import the AdminLTE script
      import('admin-lte/dist/js/adminlte.min.js');
    });
  }, []);

  return null;
};

export default AdminLTEInitializer;
