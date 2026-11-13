declare module 'dcmjs' {
  /**
   * dcmjs does not currently publish TypeScript declarations. Keep the
   * module shape open so its JavaScript API can be used from TypeScript.
   */
  const dcmjs: any;

  export default dcmjs;
}
