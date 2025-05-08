export const truncateText = (text: string, maxWords = 10) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return `${words.slice(0, maxWords).join(" ")}...`;
};