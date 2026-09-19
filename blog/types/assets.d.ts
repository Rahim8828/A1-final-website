// Type declarations for blog asset imports
declare module '../assets/*.js' {
  const content: string;
  export default content;
}

declare module '../../assets/*.js' {
  const content: string;
  export default content;
}