import axios from "axios";
import { useEffect, useState } from "react";
import { getID } from '../../helper/helper'

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
axios.defaults.baseURL = 'https://help-backend.onrender.com';


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {

        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true}));

                const { ID } = !query ? await getID() : '';
                
                const { data, status } = !query ? await axios.get(`/api/user/${ID}`) : await axios.get(`/api/${query}`);

                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}