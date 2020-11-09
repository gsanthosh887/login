import React from 'react';
import { VALIDATE_OTP } from '../queries/otpValidation.gql';
import { useLazyQuery } from '@apollo/react-hooks';
import defaultClasses from './login.scss';
import Button from '@magento/venia-ui/lib/components/Button/button';
import { useHistory } from "react-router-dom";

const LoginOtp = (props) => {
	// Fetch the data using apollo react hooks
	const [loginOtp,  { called, loading, data }] = useLazyQuery(VALIDATE_OTP, {
			variables: {generatedOTP: props.otp}
		});
	if (called && loading) return <p>Loading ...</p>
	if (!called) {
		return (<Button className={defaultClasses.requestOtpBtn} onClick={() => loginOtp()}>{'Login'}</Button>);
	}
	if(data){
        const token = data.validateOTP.token.split('=')[1].split('&')[0];
        localStorage.setItem('Token', token)
        if(token != null) {
            let history = useHistory();
            history.push("/homePage");
        }     
		console.log(data);
		return '';
	}
}

export default LoginOtp;