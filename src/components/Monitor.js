import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import StatusBlock from './StatusBlock';

export default function Monitor ({service}) {
    const [statusData, setStatusData] = useState(null);

    const fetchData = useCallback(async () => {
        console.log('fetching data', service);
        setStatusData( null );
        let { data: statusData } = await axios(service, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if ( !Array.isArray(statusData) ) {
            statusData = [statusData];
        }

        setStatusData(statusData);
      }, [service]);

    useEffect(() => {
        if (! service) {
            console.error('no service URL provided');
            return;
        }

        fetchData().catch(console.error);
        
        const timer = setInterval(async () => {
            await fetchData().catch(console.error);
        }, 60000);

        // Clean up on unmount
        return () => {
            clearInterval(timer);
        }
    }, []);

    return [
        <h2 key="service-header">Service: {service}</h2>,
        ! statusData ? 'LOADING...' : statusData.map(result => (
            <StatusBlock key={result.url} result={result} />
        ))
    ];
}
