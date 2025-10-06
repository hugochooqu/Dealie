import AuthForm from '@/components/AuthForm'
import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated';
import React from 'react'

const page = () => {

  return (
    <RedirectIfAuthenticated>
      <AuthForm type="sign-in" />
    </RedirectIfAuthenticated>
  );
}

export default page