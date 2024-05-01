import { useEffect, useState } from "react";

export default function ProjectContainer(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://172.16.5.78:5000/api/projects') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    return <div> {products}</div>
}