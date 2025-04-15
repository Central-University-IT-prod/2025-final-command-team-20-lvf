import type React from 'react';

export const stopEvent = (e: React.UIEvent | Event | React.FormEvent) => {
  e.stopPropagation();
  e.preventDefault();
};
