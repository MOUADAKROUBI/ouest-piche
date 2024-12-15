const formatDate = (dateString: string | Date | null | undefined, isTides: boolean): string => {
    // Create a Date object from the input date string
    const date = new Date(dateString!);

    // Specify options for date formatting
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long", // full weekday name (e.g., "lundi")
      day: "numeric", // day of the month
      month: "long", // full month name
      year: "numeric", // four-digit year
      hour: "2-digit", // 12-hour or 24-hour time format (based on locale)
      minute: "2-digit", // minutes
    };

    // Format the date using French locale
    if (isTides)
      return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    else return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

export {
  formatDate
}
