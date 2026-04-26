export const handleNavigationError = (rollbackFn: () => void, error: unknown) => {
    console.warn("Navigation failed:", error);
  
    rollbackFn();
  
   
  };
  