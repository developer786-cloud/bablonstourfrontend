import { useCallback, useEffect, useState } from 'react';
import tripEnquiryService from '../services/tripEnquiryService';

export default function useTripEnquiries(initialStatus = '') {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(initialStatus);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tripEnquiryService.list(status ? { status } : {});
      setItems(data.items);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load enquiries');
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, status, setStatus, refetch: load };
}
