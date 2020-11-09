import React from 'react';
import { RESEND_OTP } from '../queries/resendOtp.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import defaultClasses from './login.scss';
import Button from '@magento/venia-ui/lib/components/Button/button';

const ResendOtp = (props) => {
	// Fetch the data using apollo react hooks
	const [resendOtp,  { called, loading, data }] = useLazyQuery(RESEND_OTP);
	// if (called && loading) return <p>Loading ...</p>
	if (!called) {
		return (<a onClick={() => resendOtp()}>{'Resend OTP'}</a>);
	}
	if(data){
		console.log(data);		
		return <a onClick={() => resendOtp()}>{'Resend OTP'}</a>;
	}
}

export default ResendOtp;