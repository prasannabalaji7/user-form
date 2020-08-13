import React from 'react';
import axios from 'axios';

export const fetchComponent = (url: string, type: string, payload: any) => {
	if (type == 'GET') {
		return axios.get(url);
	} else if (type == 'POST') {
		return axios.post(url, payload);
	}
};