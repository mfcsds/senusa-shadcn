'use client';

import { useState } from 'react';
import Input from "@/components/update/input/Input";
import Button from "@/components/update/button/Button";

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-text-primary font-nostalgic mb-3">
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-text-primary font-nostalgic mb-3">
          Password
        </label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className='mb-4'
        />
      </div>
      <Button label="Login" variant="primary" size="large" className='w-full'/> 
    </form>
  );
}
