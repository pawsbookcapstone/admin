export const formatDate = (date:Date | null | undefined) => {
    if (!date) return ''

    return date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");
  }