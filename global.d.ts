/// <reference types="expo/types" />

// Déclarations de modules pour les path aliases
declare module '@/types' {
  export * from './types';
}

declare module '@/types/*' {
  const content: any;
  export default content;
}

declare module '@/lib/*' {
  const content: any;
  export default content;
}

declare module '@/components/*' {
  const content: any;
  export default content;
}

declare module '@/contexts/*' {
  const content: any;
  export default content;
}

declare module '@/hooks/*' {
  const content: any;
  export default content;
}

declare module '@/assets/*' {
  const content: any;
  export default content;
}

// Déclarations pour NativeWind
declare module 'nativewind' {
  export const styled: any;
}