export function getTextFromHtml(html: string) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent?.replace(/\n/g, "") || "";
}