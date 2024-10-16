import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Table() {
    const [data, setData] = useState([]);
    const [slicedData, setSlicedData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
                setData(response.data); // Set data
                setTotalCount(response.data.length); // Use length for total count
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Run only once on mount

    useEffect(() => {
        // Update sliced data whenever data or index changes
        setSlicedData(data.slice(index, index + 10));
    }, [data, index]); // Depend on data and index

    return (
        <div>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button 
                onClick={() => setIndex((prev) => Math.max(prev - 10, 0))}
                disabled={index === 0}
            >
                Previous
            </button>
            <button 
                onClick={() => setIndex((prev) => Math.min(prev + 10, totalCount - 10))}
                disabled={index + 10 >= totalCount}
            >
                Next
            </button>
        </div>
    );
}

export default Table;
