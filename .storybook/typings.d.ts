declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  const value: string;
  export default value;
}
