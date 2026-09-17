export function formatDate(date: string): string {
    if (!date) {
      return "—";
    }
  
    const parsedDate = new Date(date);
  
    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }
  
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(parsedDate);
  }