
export function debounce(func: (...args: any[]) => void, delay: number) {
    let timeout: NodeJS.Timeout;
    // set timeout in order to not overload the api with a lot of requests
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }
  