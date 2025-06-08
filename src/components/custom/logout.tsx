'use client';
import React from 'react';
import { Button } from '../ui/button';
import { logout } from '@/lib/actions/logout-client';
import { LogOut } from 'lucide-react';

const Logout = () => {
  return (
    <Button
      size="sm"
      variant="outline"
      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 font-medium px-4 py-2 rounded-full"
      onClick={async () => {
        await logout();
      }}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
};

export default Logout;