import AuthForm from '@/components/AuthForm'
import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated';
import React from 'react'

const page = () => {
  return (
    <RedirectIfAuthenticated>
      <AuthForm type="sign-up" />
    </RedirectIfAuthenticated>
  );
}

export default page