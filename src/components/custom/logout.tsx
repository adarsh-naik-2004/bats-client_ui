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
      className="border-orange-500/30 text-orange-300 hover:bg-orange-700/10 hover:border-orange-500/50 transition-all duration-300 font-medium px-4 py-1.5 rounded-full backdrop-blur-sm"
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