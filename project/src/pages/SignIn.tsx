import React, { useState, useEffect } from 'react';
import { Github, Facebook, Mail } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { syncUserToFirebase } from './utils/syncUserToFirebase';

const SignIn = () => {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      syncUserToFirebase(user);
    }
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return <div className="p-6 text-center">You're already signed in.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    await loginWithRedirect({
      authorizationParams: {
        screen_hint: isSignUp ? 'signup' : undefined,
        login_hint: formData.email
      }
    });
  };

  const handleGoogleSignIn = () => {
    loginWithRedirect({ connection: 'google-oauth2' });
  };

  const handleGithubSignIn = () => {
    loginWithRedirect({ connection: 'github' });
  };

  const handleFacebookSignIn = () => {
    loginWithRedirect({ connection: 'facebook' });
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'Create an account' : 'Sign in to your account'}
        </h2>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Mail size={20} />
            Continue with Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Github size={20} />
            Continue with GitHub
          </button>
          <button
            onClick={handleFacebookSignIn}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            <Facebook size={20} />
            Continue with Facebook
          </button>
        </div>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>