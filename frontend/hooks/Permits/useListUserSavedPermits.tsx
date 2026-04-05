import { useState } from "react"

const useListUserSavedPermits = () => {
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const ListUserSavedPermits = async () => {
        const response = await fetch('localhost:8000');
        const data = response.json();
        

    }
}